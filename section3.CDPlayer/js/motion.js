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
  let pageNum = 0;

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

  changePageFunc();
};
