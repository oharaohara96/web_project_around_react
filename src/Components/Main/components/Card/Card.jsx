import { useContext } from "react";
import ImagePopup from "../Popup/ImagePopup/ImagePopup.jsx";

// Importe do contexto (subindo 4 níveis até a pasta src/contexts)
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function Card(props) {
  // 1. Receber props
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const { name, link, likes, owner } = card;

  //  Desestruturação para extrair currentUser do contexto
  const { currentUser } = useContext(CurrentUserContext);

  // Verificar se o usuário atual é o dono do cartão
  const isOwn = owner?._id === currentUser?._id;

  // Esconder/Mostrar o botão de deletar com base no dono do cartão
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  // Verificar de forma segura se o usuário atual curtiu este cartão
  const isLiked = likes?.some((user) => user._id === currentUser?._id);

  // Modificador de classe CSS para ativar/desativar o coração
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  const imageComponent = {
    children: <ImagePopup card={card} />
  };

  // Manipulador do clique no coração
  function handleLikeClick() {
    onCardLike(card);
  }

  // Manipulador do clique no botão de lixeira
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