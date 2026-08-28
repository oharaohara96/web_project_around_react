import { useContext } from "react";
import ImagePopup from "../Popup/ImagePopup/ImagePopup.jsx";

// Importe do contexto
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const { name, link, likes = [], owner } = card;

  const { currentUser } = useContext(CurrentUserContext);

  const currentUserId = currentUser?._id ? String(currentUser._id) : null;
  const ownerId = typeof owner === "object" ? String(owner?._id) : String(owner);
  const isOwn = currentUserId && ownerId === currentUserId;

  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  // Identifica se o usuário curtiu o cartão
  const isLiked = typeof card.isLiked === "boolean"
    ? card.isLiked
    : (Array.isArray(likes) && currentUserId
        ? likes.some((user) => String(user?._id || user) === currentUserId)
        : false);

  // Modificador BEM oficial do projeto para o coração preenchido
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const imageComponent = {
    children: <ImagePopup card={card} />
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(imageComponent)}
        style={{ cursor: 'pointer' }}
      />

      <button
        aria-label="Delete card"
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            aria-label="Like card"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-count">{likes ? likes.length : 0}</span>
        </div>
      </div>
    </li>
  );
}