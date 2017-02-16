### console.log方法

console.log方法用于进行标准输出流的输出，即在控制台中显示一行字符串，代码如下所示：

	console.log(“This is a test string.”); 
该行代码将向控制台中输出一行“This is a test string.”字符串。

> 在默认情况下，标准输出流将被输出到控制台中，可以将它重定向输出到文件中。

例如，在命令行提示窗口中输入如下所示的命令运行app.js文件，“This is a test string.”字符串将被输出到info.log文件中（1代表重定向标准输出流）。

	node app.js 1>info.log
 

可以在console.log方法中通过参数指定输出字符串的格式，代码类似如下所示。
 

	// 从第二个参数开始，依序输出所有字符串  
	console.log("%s", "hoge", "foo");   // 输出结果为hoge foo  
	 
	// 将对象转换为字符串后输出  
	console.log("%s", "hoge", {foo:"FOO"}); // 输出结果为hoge ({foo:"FOO"})  
	 
	// 将数值转换为字符串后输出，从第二个参数开始，依序输出所有数值  
	console.log("%d",10,10.5);      // 输出结果为10 10.5  
	 
	// 将字符串作为数值进行转换，将输出NaN  
	console.log("%d", "hoge");      // 输出NaN  
	 
	// 输出百分号  
	console.log("%%", "hoge");  // 输出% hoge 
可以在console.log方法中使用各种运算符计算输出结果，也可以使用toString方法将变量值转换为字符串后进行输出，代码如下所示。
 

	console.log("2+2");     // 使用算术运算符，输出结果为4  
	console.log(2/0);           // 输出Infinity  
	 
	var a=1;  
	var b=2;  
	console.log(a=b);           // 使用赋值运算符，输出结果为2，a变量值同时被赋值为2  
	 
	var a=1;  
	var b=2;  
	// 计算数值变量a+数值变量b后的结果后进行输出  
	console.log(a+b);           // 输出结果为3  
	 
	// 将数值变量a与数值变量b均转换为字符串后使用+运算符将两个字符串值连接后输出  
	console.log(a.toString()+b.toString()); // 输出结果为12  
	 
	var a=1;  
	var b="2";  
	// 将数值与字符串相加后输出  
	console.log(a+b);           // 将数值转换为字符串后与其他字符串相连接，输出结果为12  
	 
	var a=1;  
	var b=2;  
	console.log(a==b);      // 使用比较运算符，输出false  
	console.log(a==1&&b==2);        // 使用逻辑运算符，输出true 
  
另外，在Node.js中，也可以使用console.info方法来代替console.log方法，这两个方法的作用与使用方法完全相同。