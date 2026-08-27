import { useContext } from "react";

// Contexto: sai de Main (../) e sai de Components (../) até chegar na pasta contexts
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

// Subcomponentes: estão dentro da subpasta "components" que fica do lado do seu Main.jsx
import Card from "./components/Card/Card.jsx";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
  popup,
}) {
  // Desestruturação para extrair currentUser do objeto do contexto
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      {/* Seção de Perfil */}
      <section className="profile page__section">
        <div
          className="profile__avatar-container"
          onClick={() =>
            onOpenPopup({
              children: <EditAvatar />,
              title: "Alterar a foto do perfil",
            })
          }
        >
          <img
            src={currentUser?.avatar}
            alt="Avatar do usuário"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Editar perfil"
            onClick={() =>
              onOpenPopup({
                children: <EditProfile onClose={onClosePopup} />,
                title: "Editar perfil",
              })
            }
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Adicionar cartão"
          onClick={() =>
            onOpenPopup({
              children: <NewCard />,
              title: "Novo local",
            })
          }
        />
      </section>

      {/* Seção de Cartões */}
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* Renderização condicional do Popup */}
      {popup && (
        <Popup title={popup.title} onClose={onClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;