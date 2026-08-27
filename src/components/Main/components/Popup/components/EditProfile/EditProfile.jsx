import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../../../../../contexts/CurrentUserContext.js';

export default function EditProfile({ onClose }) {
  // 1. Obtém o objeto de contexto do usuário
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  // 2. Define os estados iniciais com os valores padrão
  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  // 3. Atualiza os campos quando currentUser carregar da API
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  // Manipuladores de alteração nos inputs
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // 4. Submissão do formulário chamando a API pelo contexto
  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateUser({
      name: name,
      about: description,
    });

    if (onClose) onClose();
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Nome"
          required
          type="text"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Sobre mim"
          required
          type="text"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}