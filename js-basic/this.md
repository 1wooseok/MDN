# 'this' in JS



JS에서 함수가 호출될 때, 매개변수로 전달되는 인자값 이외에, arguments 객체와 this를 암묵적으로 전달 받는다.

``` javascript
function something(n) {
  console.log(arguments);
  console.log(this);
}

something(1);

/// 결과
// Arguments [1, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// Window {0: global, 1: global, 2: global, 3: global, 4: global, window: Window, self:   Window, document: document, name: '', location: Location, …}
```



JS의 this 는 다른 언어와는 조금 다르게 작동하는데, 

<strong>함수의 호출 방식에 따라 this에 바인딩 되는 객체가 동적으로 결정된다.</strong>



( 함수 호출 방식 )

1. 함수 호출

2. 메서드 호출
3. 생서자 함수 호출
4. apply / call / bind 호출



### 1.

일반적으로 함수를 호출하는 경우, 함수는 전역 객체의 메서드 이므로,

this === window

``` javascript
function something() {
  console.log('호출됨');
}

window.something(); // 호출됨
```



내부함수의 경우도

this === window 

```	javascript
function foo() {
  console.log('foo's this = ', this);  // window
  function bar() {
    console.log('bar's this = ', this); // window
  }
  bar();
}

foo();
```

(내부함수는 일반 함수, 메서드, call-back 함수 어디에서 선언되었든 this는 window에 바인딩 됨)



메서드의 내부함수인 경우도

this === window

``` javascript
const obj = {
    foo: function() {
        console.log("foo's this = ", this); // obj
        function bar() {
            console.log("bar's this", this); // window
        }
        bar();
    }
};

obj.foo(); 
```



콜백함수의 경우도

this === window

```javascript
	let obj = {
      foo : function() {
          setTimeout(function() {
              console.log(this); // window
          },100);
      }
  };
  
  obj.foo();,
```





### 2.

함수가 객체의 프로퍼티 값이면 메서드로서 호출된다. 

이때 메서드 내부 this는 해당 메서드를 호출한 객체에 바인딩 된다.

this === obj

```javascript
var obj1 = {
    name: 'Lee',
    sayName: function() {
        console.log(this.name);
    }
}

var obj2 = {
    name: 'Kim'
}

obj2.sayName = obj1.sayName;

obj1.sayName(); // Lee
obj2.sayName(); // Kim
```





### 3.

생성자 함수는 빈 객체를 생성하고 

생성자 함수 내에서 사용되는 this는 빈 객체를 가리킴.

this === instance

``` javascript
function Person(name) {
    console.log(this); // Person {}
    this.name = name;
}

const p = new Person('Lee');
console.log(p); // {name: 'Lee'}	 
```





### + 화살표 함수의 this

화살표 함수의 this는 언제나 상위 스코프의 this를 가리킴.

```
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function(arr) {
    return arr.map(x => `${this.name} ${x}`);
};

const p = new Person('Lee');
console.log(p.getName(['woo', 'seok']));
```

