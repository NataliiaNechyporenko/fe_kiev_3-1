# JS No.3

## Task 2. Если у кого-то возникнут вопросы по ДЗ JavaScript № 3 в пункте 2:
> "2.    Добавьте в предыдущую программу два элемента input, в которые можно ввести индекс массива и значение. По нажатию “ОК” - массив выводится."

**То вот пояснение:** это простая добавлялка элементов массива.

Я предлагаю вам реализовать её так:

- **&lt;input type="number" ...** - для ввода индекса массива (не надо массивы индексировать буквами: https://learn.javascript.ru/array#внутреннее-представление-массивов - раздел ниже "Hardcore coders only")
- **&lt;input type="text" ...** - для ввода значения массива
- **&lt;input type="button" value="Добавить элемент в массив"...** - при нажатии в массив добавляются элементы с индексом (можно использовать разреженные массивы - с "дырами" https://learn.javascript.ru/array#внутреннее-устройство-массива), а input type="number"  и input type="text" - очищаются (***опция очищения - по вашему желанию***).
- **&lt;input type="button" ...** value="ОК" - напечатать ВСЕ ЭЛЕМЕНТЫ МАССИВА в теге <p id="task_2"></p>


## Task 6. В вашей домашке JS №3 опечатка:
> 6.Добавьте кнопку push реализующую метод push() для введенного выше массива. Данные для записи необходимо считывать из input. 

Не push, a `unshift`
