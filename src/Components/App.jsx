import { useState, useEffect } from "react";
import api from "../utils/api.js";

// Importação do Contexto
import CurrentUserContext from "../contexts/CurrentUserContext.js";

// O App só importa esses 3 componentes principais:
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); // 🌟 ESTADO ELEVADO
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    // Busca os dados do usuário e a lista inicial de cartões em paralelo
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados iniciais:", err);
      });
  }, []);

  // Manipuladores de Popups
  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // Função para atualizar as informações do usuário na API, no estado local e fechar o popup
  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Erro ao atualizar o perfil:", err);
      });
  };

  // Função para atualizar a imagem do avatar na API e localmente
  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Erro ao atualizar o avatar:", err);
      });
  };

  //  MANIPULADOR DE ADIÇÃO DE NOVO CARTÃO
  const handleAddPlaceSubmit = (data) => {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]); // Atualiza o estado com uma cópia estendida contendo o novo cartão
        handleClosePopup();
      })
      .catch((err) => {
        console.error("Erro ao adicionar novo cartão:", err);
      });
  };

  // MANIPULADOR DE CURTIDAS ELEVADO
  function handleCardLike(card) {
    const isLiked = card.likes
      ? card.likes.some((user) => user._id === currentUser?._id)
      : false;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error("Erro ao alterar curtida:", error));
  }

  // MANIPULADOR DE EXCLUSÃO ELEVADO
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error("Erro ao deletar cartão:", error));
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit, //  Disponibilizado no contexto para o NewCard consumir
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;