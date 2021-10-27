const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			agenda: [],
			apiURI: "https://3001-sapphire-pelican-3nf316mn.ws-us18.gitpod.io/api"
		},
		actions: {
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
					.then(response => response.json())
					.then(data => {
						setStore({ agenda: data });
					})
					.catch(err => console.log(err));
			},
			login: (email, password) => {
				console.log(email, password);
				fetch(apiURI + "/login")
				.then(resp => resp.json())
				.then(respBody => {
					setStore({ token: respBody.token });
				})
				.catch();

				let status = getActions().checkLogin();
				console.log("Status", status);
				return status;
			},
			checkLogin: () => {
				if (getStore().token) return true;
				else return false;
			},
			logout: () => {
				setStore({ token: null });
			},
			addContact: (name, address, phone, email) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "george_agenda",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
							.then(response => response.json())
							.then(data => setStore({ agenda: data }));
						console.log("created");
					});
			},
			editContact: (name, address, phone, email, id) => {
				let store = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "put",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						agenda_slug: "george_agenda",
						full_name: name,
						email: email,
						phone: phone,
						address: address
					})
				})
					.then(response => response.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
							.then(response => response.json())
							.then(data => {
								console.log(data);
								setStore({ agenda: data });
							});
					});
			},
			deleteContact: id => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "delete",
					headers: { "Content-Type": "aplication/json" }
				}).then(() => {
					fetch("https://assets.breatheco.de/apis/fake/contact/agenda/george_agenda")
						.then(response => response.json())
						.then(data => {
							setStore({ agenda: data });
						});
				});
			}

			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
