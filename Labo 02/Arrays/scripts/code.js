const familieleden = ['Marie', 'Rob', 'Lucas', 'Nina', 'Flore'];
console.log(familieleden);
for(let i = 0; i <= 5; i += 2){
    console.log(familieleden[i]);
}

const extraLid = (familieArr) => {
    familieArr.push(prompt('Extra familielid: '));
    console.log(familieArr);
}

extraLid(familieleden);
console.log(familieleden.join(' - '));