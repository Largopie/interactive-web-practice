window.onload = () => {
  const contentWrap = document.querySelector('.contentWrap');
  const albums = document.querySelectorAll('.album');
  const innerDisks = document.querySelectorAll('.disk_inner');
  const list = document.querySelectorAll('.buttonWrap ul li');
  const [prevBtn, nextBtn] = document.querySelectorAll('button');
  const totalNum = albums.length;
  const backgrounds = [
    ['#0272a4', '#f6a564'],
    ['#b9c0ca', '#3b6a67'],
    ['#e1918c', '#5c5d8a'],
    ['#d4b389', '#c68769'],
    ['#b13235', '#0d0502'],
    ['#eff1f0', '#829d94'],
  ];
  let pageNum = Math.floor(Math.random() * totalNum);

  prevBtn.addEventListener('click', () => {
    if (pageNum > 0) pageNum--;
    else pageNum = totalNum - 1;

    changePageFunc();
  });

  nextBtn.addEventListener('click', () => {
    if (pageNum < totalNum - 1) pageNum++;
    else pageNum = 0;

    changePageFunc();
  });

  for (let i = 0; i < totalNum; i++) {
    (function () {
      list[i].addEventListener('click', () => {
        pageNum = i;
        changePageFunc();
      });
    })(i);
  }

  const changePageFunc = () => {
    contentWrap.style.background = `linear-gradient(145deg, ${backgrounds[pageNum][0]}, ${backgrounds[pageNum][1]})`;
    innerDisks[pageNum].style.backgroundColor = `${backgrounds[pageNum][0]}`;

    for (let i = 0; i < totalNum; i++) {
      if (pageNum === i) {
        albums[i].classList.add('active');
        list[i].classList.add('active');
      } else {
        albums[i].classList.remove('active');
        list[i].classList.remove('active');
      }
    }
  };

  const mobileCheck = () => {
    const mobileKeywords = ['Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson'];

    for (let info of mobileKeywords) {
      if (navigator.userAgent.match(info) !== null) return true;
    }
    return false;
  };

  const touchFunc = (event) => {
    let type = null;
    let touch = null;

    switch (event.type) {
      case 'touchstart':
        type = 'mousedown';
        touch = event.changedTouches[0];
        startX = touch.clientX;
        endX = 0;
        break;
      case 'touchend':
        type = 'mouseup';
        touch = event.changedTouches[0];
        endX = touch.clientX;

        const touchLeftToRightRange = startX - endX;
        const touchRightToLeftRange = Math.abs(startX - endX);

        if (touchLeftToRightRange < -100) {
          console.log('touchLeftToRightRange');
          pageNum--;
          if (pageNum === -1) pageNum = totalNum - 1;
        } else if (touchRightToLeftRange > 100) {
          pageNum++;
          if (pageNum === totalNum) pageNum = 0;
        }

        changePageFunc();
    }
  };

  changePageFunc();

  if (mobileCheck()) {
    contentWrap.addEventListener('touchstart', touchFunc, false);
    contentWrap.addEventListener('touchend', touchFunc, false);
  }

  let startX = 0;
  let endX = 0;
};
