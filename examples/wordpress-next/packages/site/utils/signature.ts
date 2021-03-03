function signature() {
  const normal = 'font-size: 1.2em; font-weight: bold;';
  const red = `${normal} color: #e51b24;`;

  console.info(
    '%cMade with %c<3%c by your friends at %cGS&F%c.',
    normal,
    red,
    normal,
    red,
    normal
  );
}

export default signature;
