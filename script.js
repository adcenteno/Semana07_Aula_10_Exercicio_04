var matrixDataPersons = [];
var matrixDataComparisons = [];

let Form = {
	Instance: [],
	Person: function(arrayDataPerson){
		this.firstName = arrayDataPerson[0];
		this.lastName = arrayDataPerson[1];
		this.age = arrayDataPerson[2];
		this.height = arrayDataPerson[3];
		this.weight = arrayDataPerson[4];
	},
	Comparisons: function(matrixDataPersons,matrixDataComparisons){
		this.maxAge = [`${matrixDataPersons[matrixDataComparisons[0][0]][0]} ${matrixDataPersons[matrixDataComparisons[0][0]][1]}`, matrixDataComparisons[0][1]];
		this.minAge = [`${matrixDataPersons[matrixDataComparisons[0][2]][0]} ${matrixDataPersons[matrixDataComparisons[0][2]][1]}`, matrixDataComparisons[0][3]];
		this.maxHeight = [`${matrixDataPersons[matrixDataComparisons[1][0]][0]} ${matrixDataPersons[matrixDataComparisons[1][0]][1]}`, matrixDataComparisons[1][1]];
		this.minHeight = [`${matrixDataPersons[matrixDataComparisons[1][2]][0]} ${matrixDataPersons[matrixDataComparisons[1][2]][1]}`, matrixDataComparisons[1][3]];
		this.maxWeight = [`${matrixDataPersons[matrixDataComparisons[2][0]][0]} ${matrixDataPersons[matrixDataComparisons[2][0]][1]}`, matrixDataComparisons[2][1]];
		this.minWeight = [`${matrixDataPersons[matrixDataComparisons[2][2]][0]} ${matrixDataPersons[matrixDataComparisons[2][2]][1]}`, matrixDataComparisons[2][3]];
	},
	getFormInstance: function(){
		numRows = matrixDataPersons.length;
		for (let i = 0; i < numRows; i++){
			Form.Instance.push(new Form.Person(matrixDataPersons[i]));
		}
		Form.Instance.push(new Form.Comparisons(matrixDataPersons,matrixDataComparisons))
		return Form.Instance
	},
};

function focusOnFormInput(){
	switch (document.activeElement.id){
		case "fname":
			document.querySelector("#fname").style.backgroundColor = "#FFF";
			document.querySelector("#lname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#age").style.backgroundColor = "#B6BAB5";
			document.querySelector("#height").style.backgroundColor = "#B6BAB5";
			document.querySelector("#weight").style.backgroundColor = "#B6BAB5";
			break;
		case "lname":
			document.querySelector("#fname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#lname").style.backgroundColor = "#FFF";
			document.querySelector("#age").style.backgroundColor = "#B6BAB5";
			document.querySelector("#height").style.backgroundColor = "#B6BAB5";
			document.querySelector("#weight").style.backgroundColor = "#B6BAB5";
			break;
		case "age":
			document.querySelector("#fname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#lname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#age").style.backgroundColor = "#FFF";
			document.querySelector("#height").style.backgroundColor = "#B6BAB5";
			document.querySelector("#weight").style.backgroundColor = "#B6BAB5";
			break;
		case "height":
			document.querySelector("#fname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#lname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#age").style.backgroundColor = "#B6BAB5";
			document.querySelector("#height").style.backgroundColor = "#FFF";
			document.querySelector("#weight").style.backgroundColor = "#B6BAB5";
			break;
		case "weight":
			document.querySelector("#fname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#lname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#age").style.backgroundColor = "#B6BAB5";
			document.querySelector("#height").style.backgroundColor = "#B6BAB5";
			document.querySelector("#weight").style.backgroundColor = "#FFF";
			break;
		default:
			document.querySelector("#fname").style.backgroundColor = "#FFF";
			document.querySelector("#lname").style.backgroundColor = "#B6BAB5";
			document.querySelector("#age").style.backgroundColor = "#B6BAB5";
			document.querySelector("#height").style.backgroundColor = "#B6BAB5";
			document.querySelector("#weight").style.backgroundColor = "#B6BAB5";
	}
}

function getColumnOfMatrix(numRows,numColumn){
	let columnValues = [];
	for (i = 0; i < numRows; i++){
		columnValues.push(matrixDataPersons[i][numColumn]);
	}
	return columnValues
}

function getMinMaxValues(columnValues){
	numValues = columnValues.length;
	minValue = columnValues[0];
	minIndex = 0;
	maxValue = minValue;
	maxIndex = 0;
	for (let i = 1; i < numValues; i++){
		if (columnValues[i] > maxValue){
			maxValue = columnValues[i];
			maxIndex = i;
		}else if (columnValues[i] < minValue){
			minValue = columnValues[i];
			minIndex = i;
		}
	}
	return [maxIndex, maxValue, minIndex, minValue]
}
 
function getDataComparisons(){
	remElementOfList("#listOfComparisons","#listOfComparisons > li");
	let numColumns = matrixDataPersons[0].length;
	let numRows = matrixDataPersons.length;
	let arrayReturnedValues = [];
	matrixDataComparisons = [];
	let contColumn = 2;
	while (contColumn < numColumns){
		arrayReturnedValues = getMinMaxValues(getColumnOfMatrix(numRows,contColumn));
		matrixDataComparisons.push(arrayReturnedValues);
		addElementToList(arrayReturnedValues,"#listOfComparisons",contColumn);
		contColumn = contColumn + 1;
	}
}

function addPersonToGroup(arrayDataPerson){
	matrixDataPersons.push(arrayDataPerson);
}

function getArrayDataPerson(inputDataForm){
	let arrayDataPerson = [];
	for(let numData = 0; numData < inputDataForm.length; numData++){
		switch (numData){
			case 0:
			case 1:
				arrayDataPerson[numData] = inputDataForm[numData].value.charAt(0).toUpperCase().concat(inputDataForm[numData].value.slice(1).toLowerCase());
				inputDataForm[numData].value = "";
				break;
			case 2:
				arrayDataPerson[numData] = Math.round(Math.abs(Number(inputDataForm[numData].value)));
				inputDataForm[numData].value = "";
				break;
			case 3:
			case 4:
				arrayDataPerson[numData] = Math.abs(Number(inputDataForm[numData].value));
				inputDataForm[numData].value = "";
		}
	}
	return arrayDataPerson
}

function getMessageOnHtml(arrayDataElement,listSelector,index){
	if(listSelector == "#listOfPersons"){
		return `Olá! ${arrayDataElement[0]} ${arrayDataElement[1]}, a sua idade é ${arrayDataElement[2]} anos, mede ${arrayDataElement[3]} m de altura e a sua masa corporal é ${arrayDataElement[4]} kg`;
	}else if(listSelector == "#listOfErrors"){
		switch (index){
			case 0:
				return "Você deve digitar uma cadeia de texto para o nome!"
				break;
			case 1:
				return "Você deve digitar uma cadeia de texto para o sobrenome!"
				break;
			case 2:
				return "Você deve digitar um valor numérico inteiro não negativo para a idade!"
				break;
			case 3:
				return "Você deve digitar um valor numérico não negativo para a altura (use o período como separador decimal)!"
				break;
			case 4:
				return "Você deve digitar um valor numérico não negativo para o peso (use o período como separador decimal)!"
				break;
			default:
				return "Você deve registrar pelo menos uma pessoa!"
		}
	}else{
		switch (index){
			case 2:
				return `Com ${arrayDataElement[1]} anos, ${matrixDataPersons[arrayDataElement[0]][0]} ${matrixDataPersons[arrayDataElement[0]][1]} é a pessoa de maior idade no grupo,
					e com ${arrayDataElement[3]} anos, ${matrixDataPersons[arrayDataElement[2]][0]} ${matrixDataPersons[arrayDataElement[2]][1]} é a pessoa de menor idade`;
				break;
			case 3:
				return `Com ${arrayDataElement[1]} m, ${matrixDataPersons[arrayDataElement[0]][0]} ${matrixDataPersons[arrayDataElement[0]][1]} é a pessoa de maior altura no grupo,
					e com ${arrayDataElement[3]} m, ${matrixDataPersons[arrayDataElement[2]][0]} ${matrixDataPersons[arrayDataElement[2]][1]} é a pessoa de menor altura`;
				break;
			case 4:
				return `Com ${arrayDataElement[1]} kg, ${matrixDataPersons[arrayDataElement[0]][0]} ${matrixDataPersons[arrayDataElement[0]][1]} é a pessoa de maior massa corporal no grupo,
					e com ${arrayDataElement[3]} kg, ${matrixDataPersons[arrayDataElement[2]][0]} ${matrixDataPersons[arrayDataElement[2]][1]} é a pessoa de menor massa corporal`;
		}
	}
}

function addElementToList(arrayDataElement,listSelector,index){
	let listOfElements = document.querySelector(listSelector);
	let itemElement = document.createElement("li");
	itemElement.textContent = getMessageOnHtml(arrayDataElement,listSelector,index);
	listOfElements.appendChild(itemElement);
}

function remElementOfList(listSelector,elementSelector){
	while(document.querySelector(elementSelector) != null){
		document.querySelector(listSelector).removeChild(document.querySelector(elementSelector));
	}
}

function validateDataForm(inputDataForm){
	let validData = true;
	remElementOfList("#listOfErrors","#listOfErrors > li");
	for(let numData = 0; numData < inputDataForm.length; numData++){
		if(inputDataForm[numData].value == ""){
			addElementToList([],"#listOfErrors",numData);
			validData = false;
		}else{
			switch (numData){
				case 0:
				case 1:
					if(!isNaN(Number(inputDataForm[numData].value))){
						inputDataForm[numData].value = "";
						addElementToList([],"#listOfErrors",numData);
						validData = false;
					}
					break;
				case 2:
				case 3:
				case 4:
					if(isNaN(Number(inputDataForm[numData].value))){
						inputDataForm[numData].value = "";
						addElementToList([],"#listOfErrors",numData);
						validData = false;
					}
			}			
		}
	}
	if(!validData){document.location.hash = "#blockOfErrors";}
	return validData
}

function recordFunction(){
	inputDataForm = document.querySelectorAll("form > input");
	if(validateDataForm(inputDataForm)){
		arrayDataPerson = getArrayDataPerson(inputDataForm);
		addPersonToGroup(arrayDataPerson);
		addElementToList(arrayDataPerson,"#listOfPersons",-1);
		getDataComparisons();
		document.location.hash = "#blockOfPersons";
	}
}

function finishFunction(){
	if(matrixDataPersons.length > 0){
		Form.getFormInstance();
		remElementOfList("#listOfErrors","#listOfErrors > li");
		remElementOfList("#listOfComparisons","#listOfComparisons > li");
		remElementOfList("#listOfPersons","#listOfPersons > li");
	}else{
		remElementOfList("#listOfErrors","#listOfErrors > li");
		addElementToList([],"#listOfErrors",-1);
		document.location.hash = "#blockOfErrors";
	}
}


document.querySelector("#btnRecord").addEventListener("click",recordFunction);
document.querySelector("#btnFinish").addEventListener("click",finishFunction);

document.querySelector("#fname").addEventListener("focus",focusOnFormInput);
document.querySelector("#lname").addEventListener("focus",focusOnFormInput);
document.querySelector("#age").addEventListener("focus",focusOnFormInput);
document.querySelector("#height").addEventListener("focus",focusOnFormInput);
document.querySelector("#weight").addEventListener("focus",focusOnFormInput);

document.querySelector("#fname").addEventListener("blur",focusOnFormInput);
document.querySelector("#lname").addEventListener("blur",focusOnFormInput);
document.querySelector("#age").addEventListener("blur",focusOnFormInput);
document.querySelector("#height").addEventListener("blur",focusOnFormInput);
document.querySelector("#weight").addEventListener("blur",focusOnFormInput);