import { Foodsable } from "./interfaces";
import { Food } from "./food";

export class Foods implements Foodsable {
  private static instance: Foods;
  elements = document.querySelectorAll<HTMLDivElement>('.food');
  private _activeElements: HTMLDivElement[] = [];
  private _activeElementsScore: number[] = [];

  get activeElements() {
    this._activeElements = [];
    this.elements.forEach(element => {
      if (element.classList.contains('food--active')) {
        this._activeElements.push(element);
      }
    })
    return this._activeElements;
  }
  get activeElementsScore() {
    this._activeElementsScore = [];
    this.activeElements.forEach(element => {
      
      const foodScore = element.querySelector('.food__score');
      if (foodScore) {
        this._activeElementsScore.push(Number(foodScore.textContent));
      }
    })
    return this._activeElementsScore;
  }
  // privateにすることで、クラス内でのみインスタンスの生成が可能（new Foods）
  private constructor() {
    this.elements.forEach(element => {
      new Food(element);
    })
  }
  static getInstance() {
    // Foodsインスタンスがなければインスタンスを生成
    if (!Foods.instance) {
      Foods.instance = new Foods();
    }
    return Foods.instance;
  }
}