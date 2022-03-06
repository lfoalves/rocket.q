export default function Modal() {
  const cancelButton = document.querySelector('.buttons .cancel')

  const modalWrapper = document.querySelector('.modal-wrapper')

  cancelButton.addEventListener('click', close)

  function open() {
    //funcionalidade de atribuir classe active
    modalWrapper.classList.add('active')
  }
  function close() {
    //funcionalidade de remover classe active
    modalWrapper.classList.remove('active')
  }

  return {
    open,
    close
  }
}
