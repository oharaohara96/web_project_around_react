import { useRef, useContext } from 'react';

// Importe o contexto (Ajuste o caminho até a pasta contexts conforme sua estrutura, normalmente 6 níveis acima)
import CurrentUserContext from '../../../../../../contexts/CurrentUserContext.js';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // 1. Criação do ref para acessar o input diretamente no DOM
  const avatarInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Passa o valor do input acessado pela ref para a função do contexto
    handleUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarInputRef} // 3. Vinculação da ref ao input
          className="popup__input popup__input_type_url"
          id="avatar-link"
          name="avatar"
          placeholder="Link da imagem do avatar"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}