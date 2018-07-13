const GATE_VAL = 0.8
const host = 'http://localhost:8080'
const imgKey = 'img'

function getResult(url) {
    return fetch(url).then(function (resp) {
        if (resp.ok) {
            return resp.blob()
        }
        throw new Error(url + ' cannot be fetch');
    }).then(function (value) {
        var formData = new FormData()
        formData.append(imgKey, value)
        return fetch(host, {
            method: 'POST',
            body: formData
        })
    }).then(function (resp) {
        if (resp.ok) {
            return resp.json()
        }
        throw new Error('host does not response');
    }).then(function (value) {
        return value.score
    })
}

chrome.storage.sync.get("opened", function (item) {
    if (item && item.opened) {
        Array.from(document.getElementsByTagName('img')).map(function (elem) {
            getResult(elem.src).then(function (value) {
                if (value >= GATE_VAL) {
                    console.log(elem.src + ' is usfw, ignore it')
                    elem.remove()
                } else {
                    console.log(elem.src + ' is not usfw')
                }
            }).catch(function (reason) {
                console.log(reason)
            })
        })
    }
})

