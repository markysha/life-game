# Life game

Эмулятор жизни в твоей консоли.

## Требования
На вашем компьютере должна быть установлена Node.js версии 10 и выше.
 
## Запуск
Для начала нужно склонивароть локально репозиторий.

Простой запуск выглядит так
```
node index
```

В качестве параметра можно указать путь к файлу с начальным полем.  
Файл может содержать сколько угодно строк. В каждой строке должно быть **одинаковое** количество символов.
Каждый символ описывает одну клетку начального поля и может быть:
* "*" - живая клетка
* "." - не живая 

Пример поля
```
*..
..*
```

Тогда запуск будет выглядеть так
```
node index <dirname>
```
