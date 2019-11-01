var myCards = document.getElementById('container');
var resultsArray = [];
var counter = 00;
var seconds = 00;
var tens = 00;

var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");

var buttonStart = document.getElementById('button-start');

var Interval;

var numberImages = new Array('1', '2', '3', '4', '5', '6', '7', '8');
var cloneArr = numberImages.slice(0); // создаем копию
var cards = numberImages.concat(cloneArr); // объединение массивов

//функция, перемешивающая номера картинок
function mixing(arr){
  for(var i = arr.length; i > 0; )
  {
	  var j = Math.floor(Math.random() * i);
	  var x = arr[--i];
	  arr[i] = arr[j];
	  arr[j] = x;
  }
  return arr;
}
mixing(cards);


for (var i = 0; i < cards.length; i++) {
	//создаем элемент div
  card = document.createElement('div');
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  myCards.appendChild(card);
  
  //при нажатии на квадрат
	card.onclick = function () {
		//если квадрат еще не открыт и для него еще не найдена пара
		if (this.className != 'flipped' && this.className != 'correct')
		{
			//ячейка становится открытой
			this.className = 'flipped';
			//запоминаем номер ячейки
			var result = this.dataset.item;
			//добавляем этот номер в массив результатов
			resultsArray.push(result);
			clearInterval(Interval);
			Interval = setInterval(Timer, 10);
		}

		//если в массиве более 1 открытой ячейки
		if (resultsArray.length > 1) 
		{
			//если элементы совпадают
			if (resultsArray[0] === resultsArray[1]) 
			{
				//найденна пара
				check("correct");
				//количество найденных пар увеличивается на 1
				counter ++;
				//проверка на выигрыш
				win();
				//массив становится пустым
				resultsArray = [];
			} 
			else 
			{
				//пара найдена не верно
				check("reverse");
				//массив становится пустым
				resultsArray = [];
			}

		}

	}
};


//при нажатии на кнопку "Старт"
buttonStart.onclick = function() {
	//начинается отсчет времени
	Interval = setInterval(Timer, 10);
}

var check = function(className) {
  var x = document.getElementsByClassName("flipped");

  setTimeout(function() {

    for(var i = (x.length - 1); i >= 0; i--) {
      x[i].className = className;
    }

  },500);

}

//функция выигрыша
var win = function () {
	//если количество найденных пар равно 8
  if(counter === 8) 
  {
		clearInterval(Interval);
	
		//определяем время, в которое игра была завершена
		var endTens;			//милисекунды
		var endSeconds;			//секунды
	
		if(tens < 9){
			endTens = "0" + tens;
		}

		if (tens > 9){
			endTens = tens;
		}

		if (tens > 99) {
			seconds++;
			endSeconds = "0" + seconds;
			tens = 0;
			endTens = "0" + 0;
		}

		if (seconds > 9){
			endSeconds = seconds;
		}
	
		//выводим всплывающее окно с поздравлением о выигрыше и затраченном времени
		alert("Вы выиграли! \nЗатраченное время: " + endSeconds + ":" + endTens);
  }
}

//функция подсчета времени
function Timer () {
	//милисекунды увеличиваются на 1
  tens++;

  if(tens < 9){
		//если милисекунды меньше 9, то впереди приписывается 0
    appendTens.innerHTML = "0" + tens;			
  }

  if (tens > 9){
		//если милисекунды больше 9, то они отображаются в таком виде, в котором есть
    appendTens.innerHTML = tens;	

  }

  if (tens > 99) {
		//если милисекунды больше 99, то секунды увеличиваются на 1, секунды записываются с 0 спереди, а милисекунды превращаются в 00			
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9){
		//если секунды больше 9, то они отображаются в таком виде, в каком есть
    appendSeconds.innerHTML = seconds;
  }

}