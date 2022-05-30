import appServer from "./appServer.js";
import authServer from "./authServer.js";

appServer.listen(8000, () => {
    console.log(`App Server is running at http://localhost:8000`);
})

authServer.listen(8010, () => {
	console.log(`Auth Server is running at http://localhost:8010`);
});