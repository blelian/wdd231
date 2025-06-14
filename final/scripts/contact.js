
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closes = document.querySelectorAll('.close');

    modalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.getElementById(btn.dataset.modal);
        modal.style.display = 'block';
      });
    });

    closes.forEach(close => {
      close.addEventListener('click', () => {
        close.closest('.modal').style.display = 'none';
      });
    });

    window.addEventListener('click', (e) => {
      modals.forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
      });
    });
  