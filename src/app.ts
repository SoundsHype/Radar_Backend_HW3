import express from 'express'

const app = express();
app.use(express.text());

class Calc {

	formula: string[];

	constructor(getFormula: string){
		getFormula = getFormula.replace(/\s/g, "");
		this.formula = getFormula.split(/([/+()*-])/);
		while (this.formula.indexOf("") != -1)
			this.formula.splice(this.formula.indexOf(""), 1);
	}

	priority(term: string): number{
		if (term == "+" || term == "-")
			return 1;
		if (term == "*" || term == "/")
			return 2;
		return 0;
	}

	middleCalc(a, b: number, term: string): number{
		let ab: number;
		switch(term) {
			case "+":
				ab = +a + +b;
			break;
			case "-":
				ab = +a - +b;
			break;
			case "*":
				ab = +a * +b;
			break;
			case "/":
				ab = +a / +b;
			break;
		}
		return ab;
	}

	maths(): number{
		let nums: number[] = [];
		let terms: string[] = [];
		let unMin: boolean = true;
		let anyTerms: string[] = ["+", "-", "*", "/", "(", ")"];

		this.formula.forEach((elem) => {
			if (anyTerms.indexOf(elem) == -1){
				nums.push(elem);
				unMin = false;
				return;
			}

			if (elem == "("){
				unMin = true;
				terms.push(elem);
				return;
			}

			if (elem == ")"){
				while (terms[terms.length-1] != "("){
				 	let a, b: number;
				 	b = nums.pop();
				 	a = nums.pop();  
					nums.push(this.middleCalc(a, b, terms.pop()));
				}
				terms.pop();
				return;
			}

			if (terms.length != 0 && this.priority(elem) <= this.priority(terms[terms.length-1])){
				while (terms.length != 0){
					if (terms[terms.length-1] == "(")
						break;
				 	let a, b: number;
				 	b = nums.pop();
				 	a = nums.pop();  
					nums.push(this.middleCalc(a, b, terms.pop()));
				}
			}
			
			if (unMin)
				nums.push(0);
			terms.push(elem);
		});

		while (terms.length != 0){
		 	let a, b: number;
		 	b = nums.pop();
		 	a = nums.pop();  
			nums.push(this.middleCalc(a, b, terms.pop()));
		}
		return nums.pop();
	}

	print(){
		console.log(this.formula);
	}

}

app.listen(3000, () => {
	let calc = new Calc("(-(-3)) +  (7-5/(2+3))*(7-2)");
	calc.print();
	console.log(calc.maths());
});