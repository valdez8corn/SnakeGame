$(document).ready(function () {

  let toggling = false;
  const menuInterval = 700;
  let menuOpen = true;
  let gameOn = false;

  const menuToggle = $('#menuToggle');
  const selectContainer = $('.selectContainer');
  const optionsContainer = $('.optionsContainer');
  const startGameButton = $('#optionsComplete');

  menuToggle.on('click', () => {
    toggleMenu();
  });

  startGameButton.on('click', () => {
    console.log('startGame');
    window.gameOn = true;
  })

  /** Universal game event listener */
  $(document).on("keydown", function (event) {
    const { keyCode } = event;
    if (!gameOn && keyCode === 32) {
      gameOn = true;
      $('#instructions').attr('class', 'hidden');
      toggleMenu();
    }
  });

  function toggleMenu() {
    if (toggling) return;

    toggling = true;
    let immediateAction;
    let delayOption;
    const localMenuState = menuOpen;
    const buttonClass = !localMenuState ? 'chevronUp' : 'chevronDown';
    menuToggle.children('span').attr('class', buttonClass);

    const toggleSelect = () => {
      selectContainer.toggleClass('expandY', !localMenuState);
      selectContainer.toggleClass('collapseY', localMenuState);
    };
    const toggleSettings = () => {
      optionsContainer.toggleClass('expandY', localMenuState);
      optionsContainer.toggleClass('collapseY', !localMenuState);
    };

    if (localMenuState) {
      immediateAction = toggleSelect;
      delayOption = toggleSettings;
    } else {
      immediateAction = toggleSettings;
      delayOption = toggleSelect;
    }

    window.setTimeout(() => {
      delayOption();
      menuOpen = !menuOpen;
      toggling = false;
    }, menuInterval);
    immediateAction();
  }

});

