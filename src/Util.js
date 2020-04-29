export default class Util {

  static render(container, component, place = `beforeend`) {
    switch (place) {
      case `afterbegin`:
        container.prepend(component.getElement());
        break;
      case `beforeend`:
        container.append(component.getElement());
        break;
    }
  }

  static getRandomNumber(min, max, round = 1) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round((rand) * round) / round;
  }


  static createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  static getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static getMonthName(dateObject) {
    const monthNames = [
      `January`, `February`, `March`, `April`, `May`, `June`,
      `July`, `August`, `September`, `October`, `November`, `December`,
    ];
    return monthNames[dateObject.getMonth()];
  }

  static getRandomBoolean() {
    return this.getRandomArrayElement([true, false]);
  }

  static getFormatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.round(duration % 60);
    return `${hours}h ${minutes}m`;
  }

  static getCommentFormatDate(date) {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
