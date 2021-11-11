import express from 'express'

const app = express();
app.use(express.text());

function calcint (formula: String): Number {
	var ab = formula.split(/([()])/);
	var temp = ab[Math.trunc(ab.length/2)];
	if (formula.indexOf('+') != -1){
		ab = temp.split('+')
		return (+ab[0]) + (+ab[1]);
	}
	if (formula.indexOf('/') != -1){
		ab = temp.split('/')
		return (+ab[0]) / (+ab[1]);
	}
	if (formula.indexOf('*') != -1){
		ab = temp.split('*')
		return (+ab[0]) * (+ab[1]);
	}
	if (formula.indexOf('-') != -1){
		ab = temp.split('-')
		if (ab[0] = '')
			return +ab[1] * -1;
		else
			return (+ab[0]) - (+ab[1]);
	}
}

function calc (formula: String): String {
	var temp1, temp2;
	formula.split(/([()])/);
	while (formula.indexOf("(") != -1){
		formula = formula.replace(/\s/g, "");
		temp1 = formula.slice(0, formula.lastIndexOf("("));
		temp2 = formula.slice(formula.indexOf(")")+1);
		formula = temp1 + calcint(formula.substring(formula.lastIndexOf("(") + 1, formula.indexOf(")"))).toString() + temp2;
		console.log(formula);
	}
	if (formula.indexOf('+') != -1 || formula.indexOf('-') != -1 || formula.indexOf('/') != -1 || formula.indexOf('*') != -1)
		formula = calcint(formula).toString();
	return formula;
}

app.get("/", (req, res) => {
	return res.send(calc(req.body).toString());
});

app.listen(3000, () => {
	console.log("Port: 3000");
});