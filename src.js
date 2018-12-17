
var arrNum = new Array();	

window.onload = function()
{
	txtClear();			
}

function Input()
{	
	try
	{			
		var sInput = mainForm.txt_Input.value;
		var nIndex = mainForm.lst_Log.options.length;			
		var cInput = new Option(sInput);
		var sResult = "";
		var strike = mainForm.txt_Strike.value;
		var ball = mainForm.txt_Ball.value;

		var str1 = sInput.substr(0, 1);
		var str2 = sInput.substr(1, 1);
		var str3 = sInput.substr(2, 1);

		if ((str1 == '') || (str2 == '') || (str3 == ''))
		{
			alert("Three-digit number was not entered.");
			mainForm.txt_Strike.value = "";
			mainForm.txt_Ball.value = "";
			mainForm.txt_Input.value = "";
			return;	
		}

		if ((str1 == str2) || (str2 == str3) || (str1 == str3))
		{
			alert("Same number can not be used.");
			mainForm.txt_Strike.value = '';
			mainForm.txt_Ball.value = '';
			mainForm.txt_Input.value = '';
			return;
		}
		debugger;
		var Count = 0;

		for (var nCnt = arrNum.length - 1; nCnt >= 0; nCnt--)
		{
		    var fullStr = String(arrNum[nCnt]);
		    var nctArr = fullStr.split('');
		    if (nctArr.length == 2) {
		        fullStr = "0" + fullStr;
		    }
			var strComp1 = Number(fullStr.substr(0, 1));
			var strComp2 = Number(fullStr.substr(1, 1));
			var strComp3 = Number(fullStr.substr(2, 1));	

			if (((strike == '') || (strike == '0')) && ((ball == '') || (ball == '0')))
			{
				// 아웃
				if ((str1 == strComp1) || (str1 == strComp2) || (str1 == strComp3) ||
					(str2 == strComp1) || (str2 == strComp2) || (str2 == strComp3) ||
					(str3 == strComp1) || (str3 == strComp2) || (str3 == strComp3))
					arrNum.splice(nCnt, 1);
				sResult = "OUT";
			}

			else if (((strike == '') || (strike == '0')) && (ball != ''))
			{
				// 볼	
				var Count = 0;									
				if (str1 == strComp2) 
					Count++;
				else if (str1 == strComp3)
					Count++;

				if (str2 == strComp1)
					Count++;
				else if (str2 == strComp3)
					Count++;

				if (str3 == strComp1)
					Count++;					
				else if (str3 == strComp2)
					Count++;

				if ((Count != ball) || (str1 == strComp1) || (str2 == strComp2) || (str3 == strComp3))
					arrNum.splice(nCnt, 1);
				sResult = ball + 'B';
			}
			else if ((strike != '') && ((ball == '') || (ball == 0)))
			{
				var Count = 0;
				if (str1 == strComp1)
					Count++;
				else if (str1 == strComp2)
					Count++;
				else if (str1 == strComp3)
					Count++;

				if (str2 == strComp1)
					Count++;
				else if (str2 == strComp2)
					Count++;
				else if (str2 == strComp3)
					Count++;

				if (str3 == strComp1)
					Count++;
				else if (str3 == strComp2)
					Count++;
				else if (str3 == strComp3)
					Count++;

				if (strike == 1)
				{
					// 1스트라이크
					if ((Count != 1) || (!((str1 == strComp1) || (str2 == strComp2) || (str3 == strComp3))))
						arrNum.splice(nCnt, 1);
				}
				else if (strike == 2)
				{
					// 2스트라이크						
					if (!(((str1 == strComp1) && (str2 == strComp2))
						|| ((str1 == strComp1) && (str3 == strComp3))
					 	|| ((str2 == strComp2) && (str3 == strComp3)))
					  	|| ((str1 == strComp1) && (str2 == strComp2) && (str3 == strComp3)))
						arrNum.splice(nCnt, 1);
				}
				else
				{
					alert("Input Error. (Strike or Ball)");
					return;
				}
				sResult = strike + 'S';
			}
			else
			{
				// 스트라이크 볼 다 있을때
				if ((strike == 1) && (ball == 1))
				{
					if (!(((str1 == strComp1) && (str2 == strComp3) && (str3 != strComp2))
            	        || ((str1 == strComp1) && (str3 == strComp2) && (str2 != strComp3))
                        || ((str2 == strComp2) && (str1 == strComp3) && (str3 != strComp1))
                        || ((str2 == strComp2) && (str3 == strComp1) && (str1 != strComp3))
                        || ((str3 == strComp3) && (str1 == strComp2) && (str2 != strComp1))
                        || ((str3 == strComp3) && (str2 == strComp1) && (str1 != strComp2))))
                        arrNum.splice(nCnt, 1);
				}
				else if ((strike == 1) && (ball == 2))
				{
					if (!(((str1 == strComp1) && (str2 == strComp3) && (str3 == strComp2))
                    	|| ((str2 == strComp2) && (str1 == strComp3) && (str3 == strComp1))
                        || ((str3 == strComp3) && (str1 == strComp2) && (str2 == strComp1))))
                        arrNum.splice(nCnt, 1);
				}
				else
				{
					alert("Input Error. (Strike or Ball)");
					return;
				}
				sResult = strike + 'S' + ball + 'B';
			}
		}

		var str_result = '';
		for (var i = 0; i < arrNum.length; i++)
		{
			var nctArr = arrNum[i].toString().split('');
		        if(nctArr.length == 2){
				arrNum[i] = "0"+arrNum[i];
		        }
			if ((i % 10 == 0) && (i != 0))
				str_result = str_result + "\n" + arrNum[i] + ', ';
			else if ( i % 10 == 9)
				str_result = str_result + arrNum[i];
			else if (i == arrNum.length - 1)
				str_result = str_result + arrNum[i];
			else
				str_result = str_result + arrNum[i] + ', ';
		}

		mainForm.txt_result.value = str_result;
			
		var option_Log = new Option();
		option_Log.text = sInput + "  -  " + sResult;
		mainForm.lst_Log.options.add(option_Log);
		mainForm.txt_Strike.value = "";
		mainForm.txt_Ball.value = "";
		mainForm.txt_Input.value = "";				

		var probability = 1.0 / arrNum.length * 100;
		var label = document.getElementById('lbl_Probability');
		label.innerHTML = probability.toFixed(2).toString() + '%';
	}
	catch(e)
	{
		alert(e);
	}
}

function txtClear()
{
    debugger;
	mainForm.txt_Strike.value = '';
	mainForm.txt_Ball.value = ''
	mainForm.txt_Input.value = '';
	mainForm.txt_result.value = '';
	mainForm.lst_Log.options.length = 0;
	arrNum.length = 0;
	for (var nCnt = 012; nCnt <= 999; nCnt++)
	{
	    var fullStr = String(nCnt);
	    var nctArr = fullStr.split('');
	    if(nctArr.length == 2){
	        fullStr = "0"+fullStr;
	    }
		var str1 = Number(fullStr.substr(0, 1));
		var str2 = Number(fullStr.substr(1, 1));
		var str3 = Number(fullStr.substr(2, 1));

		if ((str1 != str2) && (str2 != str3) && (str1 != str3))
			arrNum[arrNum.length] = nCnt;					
	}
	var probability = 1.0 / arrNum.length * 100;
	var label = document.getElementById('lbl_Probability');
	label.innerHTML = probability.toFixed(2).toString() + '%';
}

function InputNumber(evt)
{
	if (event.keyCode >= 48 && event.keyCode <= 57)
        return true;
	else
        event.returnValue = false;
}
