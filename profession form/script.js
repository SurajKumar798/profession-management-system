let employeeList = JSON.parse(localStorage.getItem('employee-list')) || [];
let employeeCounter = employeeList.length ? Math.max(...employeeList.map(emp => emp.id)) + 1 : 1;

window.onload = () =>{
    addEmployee();
}

function handleSubmit(){
    const employee = document.getElementById('empName').value;
    const profession = document.getElementById('empProfession').value;
    const age = document.getElementById('age').value;
    const messageDiv = document.getElementById('message');

    if(employee === '' || profession === '' || age === ''){
        messageDiv.textContent = 'Error:Please Make sure All the field are filled before adding in an emplyee';
        messageDiv.className = 'error';
        return;
    }
    let newEmployee = {
        id: employeeCounter++,
        employee,
        profession,
        age:Number(age)
    };
    employeeList.push(newEmployee);

    localStorage.setItem('employee-list', JSON.stringify(employeeList));

    messageDiv.textContent = 'Success: Employee Added';
    messageDiv.className = 'success';
    
    document.getElementById('empName').value = '';
    document.getElementById('empProfession').value = '';
    document.getElementById('age').value = '';

    addEmployee();
}
function addEmployee(){
    const container = document.getElementById('employee-list');
    container.innerHTML = '';

    if(employeeList.length ===  0){
        container.innerHTML = '<p>You have 0 Employees.</p>'
        return;
    }
    employeeList.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';

        const info = document.createElement('div');
        info.className = 'employee-info';
        info.innerHTML = ` 
         <p> ${emp.id}</p>
         <p> Name: ${emp.employee}</p>
         <p>Profession: ${emp.profession} </p>
         <p>Age: ${emp.age}</p>`
             

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = () => deleteEmployee(emp.id);
        
        card.appendChild(info);
        card.appendChild(deleteBtn);
        container.appendChild(card);
    });
}
function deleteEmployee(id){
    employeeList = employeeList.filter(emp => emp.id !== id);

    localStorage.setItem('employeeList', JSON.stringify(employeeList));

    addEmployee();

    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Employee deleted successfully';
    messageDiv.className = 'success';
}