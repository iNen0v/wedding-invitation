// Брояч за гостове
let guestCount = 0;

// Функция за добавяне на гост
function addGuest() {
    guestCount++;
    const guestsList = document.getElementById('guests-list');
    
    const guestDiv = document.createElement('div');
    guestDiv.className = 'guest-item';
    guestDiv.innerHTML = `
        <input type="text" name="guest-${guestCount}" placeholder="Име на гост ${guestCount}" required>
        <button type="button" onclick="removeGuest(this)">-</button>
    `;
    
    guestsList.appendChild(guestDiv);
}

// Функция за премахване на гост
function removeGuest(button) {
    button.parentElement.remove();
}

// Функция за изпращане на формата
document.getElementById('wedding-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвратява нормалното изпращане
    
    // Събиране на данните
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Показване на данните (тук може да изпратиш на сървър)
    console.log('Данни от въпросника:', data);
    alert('Благодарим! Вашите данни са изпратени успешно!');
    
    // Изчистване на формата
    this.reset();
});
