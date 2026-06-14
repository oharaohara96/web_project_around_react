import { useState } from "react";

import avatarImg from "../../images/avatar.jpg";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";

// Dados fictícios (Mock data)
const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
  },
];

console.log(cards);

function Main() {
  const [popup, setPopup] = useState(null);

  // Configuração dos objetos de cada popup formulário
  const newCardPopup = { title: "Novo lugar", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Alterar a foto do perfil", children: <EditAvatar /> };

  // Função que abre QUALQUER popup (seja formulário ou imagem)
  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  // Função que fecha o popup ativo
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image profile__avatar"
            src={avatarImg}
            alt="Avatar"
          />
          <button
            aria-label="Alterar foto de perfil"
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">Explorador</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {/* Loop que renderiza os cartões na tela */}
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleOpenPopup}
            />
          ))}
        </ul>
      </section>

      {/* RENDERIZAÇÃO CONDICIONAL DO POPUP CORINGA */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

    </main>
  );
}

export default Main;