export default function EditAvatar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário de avatar enviado sem recarregar!");
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