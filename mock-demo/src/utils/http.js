export function getParams(data){
	let arr = [];
	for (let name in data) {
	  arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	}
	return arr.join('&');
}
/**
 * 自定义http请求
 */
class Http {
	get(url, params) {
		let self = this;
		let xmlhttp = new XMLHttpRequest();
		return new Promise((resolve, reject) => {
			xmlhttp.onreadystatechange = () => {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						let temp = JSON.parse(xmlhttp.responseText);
						if (temp.errorCode == 0) {
							resolve(temp);
						} else if (temp.errorCode == 1) {
							reject(temp);
						} else {
							reject(temp);
						}
					} else {
						reject();
					}
				}
			};
			xmlhttp.open("POST",url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
			let data=getParams(params);
			xmlhttp.send(data);
		});
	}
	post(url, params) {
		let self = this;
		let xmlhttp = new XMLHttpRequest();
		return new Promise((resolve, reject) => {
			//这里this指向xmlhttp
			xmlhttp.onreadystatechange = () => {
			  if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
                  let temp = JSON.parse(xmlhttp.responseText);
                  console.log(temp);
				  if (temp.errorCode == 0) {
					resolve(temp);
				  } else if (temp.errorCode == 1) {
					reject(temp);
				  } else {
					reject(temp);
				  }
				} else {
				  reject();
				}
			  }
			};
			xmlhttp.open("POST", url, true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
			xmlhttp.send(JSON.stringify(params));
		});
	}
}

let http = new Http();
export default http;