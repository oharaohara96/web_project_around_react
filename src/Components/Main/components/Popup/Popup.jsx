export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    /* Mantemos a classe popup_is-opened para o controle do React/CSS */
    <div className="popup popup_is-opened">

      {/* 🌟 CLASSE DINÂMICA: Se NÃO houver title, injeta a classe de estilo de imagem do seu CSS */}
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        />

        {/* 🌟 RENDERIZAÇÃO CONDICIONAL: Só mostra o h3 se a propriedade 'title' existir */}
        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}