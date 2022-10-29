class User {
	static properties = ['firstName', 'lastName', 'email'];

	constructor(id, firstName, lastName, email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
}

const users = [
	new User(1, 'John', 'Doe', 'jdoe@gmail.com'),
	new User(2, 'Jane', 'Bob', 'janeb@yahoo.com'),
	new User(3, 'Joe', 'Smith', 'jemith21@gmail.com'),
];

function createEditSaveButton(user, onSave) {
	let viewMode = true;
	const editButton = document.createElement('button');
	editButton.id = `edit-btn-${user.id}`;
	editButton.type = 'button';

	editButton.innerHTML = 'Edit';
	editButton.addEventListener('click', () => {
		viewMode = !viewMode;

		const tableRow = document.querySelector(`#user-${user.id}`);
		if (!tableRow) {
			console.error(`Could not find cells for user ${user.id}`);
			return;
		}

		const values = {};
		const cells = tableRow.children;
		for (let cellIndex = 0; cellIndex < cells.length - 1; cellIndex++) {
			const cell = cells[cellIndex];

			const input = cell.querySelector('input');
			const span = cell.querySelector('span');

			input.classList.toggle('hidden');
			span.classList.toggle('hidden');

			editButton.innerHTML = viewMode ? 'Edit' : 'Save';

			span.innerText = input.value;

			values[input.name] = input.value;
		}

		if (viewMode) {
			onSave(values);
		}
	});

	return editButton;
}

function setupUser(table, user) {
	const tableRow = document.createElement('tr');
	tableRow.id = `user-${user.id}`;

	for (const property of User.properties) {
		tableRow.innerHTML += `
		<td>
			<span>${user[property]}</span>
			<input class="hidden" name="${property}" type="text" value="${user[property]}" placeholder="" title="Editing the user ${property}" />
		</td>`;
	}

	const editButtonCell = document.createElement('td');
	const editButton = createEditSaveButton(user, console.log);
	editButtonCell.appendChild(editButton);
	tableRow.appendChild(editButtonCell);
	table.appendChild(tableRow);
}

export function setupUsers() {
	const table = document.querySelector('#users-table-body');
	if (!table) {
		console.error('Could not find users table');
		return;
	}

	users.forEach((user) => setupUser(table, user));

	document.querySelector('#add-user-btn').addEventListener('click', () => {
		const user = new User(users.length + 1, 'New', 'User', 'newuser@someemail.com');
		setupUser(table, user);
	});
}
