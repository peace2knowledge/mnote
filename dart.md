```dart
import 'dart:async';
import 'dart:math' show Random;

main() async {
  print('Compute π using the Monte Carlo method.');
  await for (var estimate in computePi().take(500)) {
    print('π ≅ $estimate');
  }
}

/// Generates a stream of increasingly accurate estimates of π.
Stream<double> computePi({int batch: 100000}) async* {
  var total = 0;
  var count = 0;
  while (true) {
    var points = generateRandom().take(batch);
    var inside = points.where((p) => p.isInsideUnitCircle);
    total += batch;
    count += inside.length;
    var ratio = count / total;
    // Area of a circle is A = π⋅r², therefore π = A/r².
    // So, when given random points with x ∈ <0,1>,
    // y ∈ <0,1>, the ratio of those inside a unit circle
    // should approach π / 4. Therefore, the value of π
    // should be:
    yield ratio * 4;
  }
}

Iterable<Point> generateRandom([int seed]) sync* {
  final random = new Random(seed);
  while (true) {
    yield new Point(random.nextDouble(), random.nextDouble());
  }
}

class Point {
  final double x, y;
  const Point(this.x, this.y);
  bool get isInsideUnitCircle => x * x + y * y <= 1;
}
```



## 基本数据结构



## 函数



## 类

### 类的定义

```dart
class Point {
  num x; // 定义实例变量，默认初始化值为 null
  num y; // 
  num z = 0; // 声明实例变量 z, 初始化值为 0.
}
```

所有实例变量自动产生getter 方法，但是只有非final变量产生setter方法。

```dart
class Point {
  num x;
  num y;
}

void main() {
  var point = new Point();
  point.x = 4; // 调用x的setter方法赋值
  assert(point.x == 4); // 使用x的getter方法获取值.
  assert(point.y == null); // Values default to null.
}
```

变量在创建的地方被初始化，那么变量的初始化是在，构造函数和初始化器执行之前的。

### 构造函数

简单说就是一个函数，但是函数名和类型相同，没有返回值，但是有参数。

```dart
class Point {
  num x, y;

  Point(num x, num y) {
    // There's a better way to do this, stay tuned.
    this.x = x;
    this.y = y;
  }
}
```

构造函数用于创建一个类的实例

下面你是讲构造函数的参数赋值给实例变量的语法糖：

``` dart
class Point {
  num x, y;
  Point(this.x, this.y);
}
```

### 命名构造函数

``` dart
class Point {
  num x, y;
  // 正常的构造函数
  Point(this.x, this.y);

  // 命名构造函数
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

构造函数是不能被继承，所以如果子类希望通过命名构造函数创建实例，就必须自己实现。

### 调用父类非默认构造函数

``` dart
class Person {
  String firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson(data).
  Employee.fromJson(Map data) : super.fromJson(data) {
    print('in Employee');
  }
}

main() {
  var emp = new Employee.fromJson({});

  // Prints:
  // in Person
  // in Employee
  if (emp is Person) {
    // Type check
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
}






```

构造函数参数执行在构造函数之前，所以构造函数的参数可以是函数，在dart中函数可以作为参数。

``` dart
class Employee extends Person {
  Employee() : super.fromJson(getDefaultData());
  // ···
}
```

### 初始化列表

初始化列表是初始化实例变量，在构造函数体执行之前。

```dart

Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

> 初始化表达式的右边是不能使用this关键字的

可以在初始化列表的位置，校验参数是否合法

```dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```



``` dart
import 'dart:math';

class Point {
  final num x;
  final num y;
  final num distanceFromOrigin;

  Point(x, y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

main() {
  var p = new Point(2, 3);
  print(p.distanceFromOrigin);
}
```

### 重定向构造函数

这种构造函数，将调用同一个类中的其他构造函数。

``` dart
class Point {
  num x, y;

  // 主构造函数
  Point(this.x, this.y);

  // 重定向到主构造函数
  Point.alongXAxis(num x) : this(x, 0);
}
```

### 常量构造函数

``` dart 
class ImmutablePoint {
  static final ImmutablePoint origin =
      const ImmutablePoint(0, 0);

  final num x, y;
// 常量构造函数
  const ImmutablePoint(this.x, this.y);
}
```

要求类中的实例变量都是final的。这个类所所创建的 ？？？？，编译时常量。但是在执行时，能创建实例，只是实例不能修改，为啥叫编译时常量。和枚举的区别。

### 工场构造函数



``` dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    if (_cache.containsKey(name)) {
      return _cache[name];
    } else {
      final logger = new Logger._internal(name);
      _cache[name] = logger;
      return logger;
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```



工厂构造函数不总是返回一个新的实例，而是从缓存中返回一个已经有的实例。或者返回一个子类的实例。是用``factory``关键字定义的。

###  Methods 方法

#### 实例方法

实例方法可以使用this关键字

``` dart
import 'dart:math';

class Point {
  num x, y;

  Point(this.x, this.y);

  num distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

#### Getters and setters

实例变量会自动产生getter和 setter方法。但是也自己定义。

```dart
class Rectangle {
  num left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // 自定义getter setter方法
  num get right => left + width;
  set right(num value) => left = value - width;
  num get bottom => top + height;
  set bottom(num value) => top = value - height;
}

void main() {
  var rect = new Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

### Abstract methods 抽象方法

自定义不现实，定义在抽象类中。

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```



### 运算符重写

向量想家和相减的重写，`operator`关键字加操作符

```dart
class Vector {
  final int x, y;

  const Vector(this.x, this.y);

  /// Overrides + (a + b).
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }

  /// Overrides - (a - b).
  Vector operator -(Vector v) {
    return new Vector(x - v.x, y - v.y);
  }
}

void main() {
  final v = new Vector(2, 3);
  final w = new Vector(2, 2);

  // v == (2, 3)
  assert(v.x == 2 && v.y == 3);

  // v + w == (4, 5)
  assert((v + w).x == 4 && (v + w).y == 5);

  // v - w == (0, 1)
  assert((v - w).x == 0 && (v - w).y == 1);
}
```





### 抽象类

### 类的继承

### 类的实例化





``` dart
class Point {
  num x, y;

  Point(this.x, this.y);

  // Named constructor
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

### 抽象类

被``abstract`` 修改的类是抽象类，抽象类不能实例化

```dart
// This class is declared abstract and thus
// can't be instantiated.
abstract class AbstractContainer {
  // Define constructors, fields, methods...

  void updateChildren(); // Abstract method.
}
```

抽象类通常是用来定义接口，等待实现

抽象类中有抽象方法。

### 隐式接口





## 泛型
## 异步
