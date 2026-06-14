// 🌟 1. Importe o ImagePopup lá no topo do arquivo
import ImagePopup from "../Popup/ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  // Desestruturando o card e a função onCardClick que veio do Main
  const { card, onCardClick } = props;
  const { name, link, isLiked } = card;

  // 🌟 2. Crie o objeto imageComponent (SEM 'title' para o Popup mudar o CSS)
  const imageComponent = {
    children: <ImagePopup card={card} />
  };

  return (
    <li className="card">
      {/* 🌟 3. Chame o onCardClick passando o objeto configurado ao clicar na img */}
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(imageComponent)}
        style={{ cursor: 'pointer' }} /* Dica: adiciona o cursor de clique na foto */
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={`card__like-button ${isLiked ? 'card__like-button_is-active' : ''}`}
        />
      </div>
    </li>
  );
}