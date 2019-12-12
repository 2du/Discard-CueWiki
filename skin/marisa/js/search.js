function search_do() {
    function search_load() {
        var data = document.getElementById("search_input").value;
        if(before !== data && data !== '') {
            before = data;
            var url = "/api/search/" + encodeURI(data);
        
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.send(null);
            
            xhr.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200) {
                    document.getElementById("pre_search").style.display = 'block';

                    var get_data = JSON.parse(this.responseText);
                    document.getElementById("pre_search").innerHTML = '';

                    if(this.responseText !== "{}\n") {
                        for(key in get_data) {
                            document.getElementById("pre_search").innerHTML += '<a href="/w/' + encodeURI(get_data[key][0]).replace('#', '%23') + '">' + get_data[key][0] + '</a><br>';
                        }
                    } else {
                        document.getElementById("pre_search").style.display = 'none';
                    }
                }
            }
        } else if(before !== data && data === '') {
            before = '';
            document.getElementById("pre_search").style.display = 'none';
        }
    }

    var before = '';
    save_data = 'pre_search';
    open = 1;
    setTimeout(function() { open = 0; }, 100);
    setInterval(search_load, 1000);
}

function view_search() {
    var data = document.getElementById("pre_search").innerHTML;
    if(data !== '') {
        document.getElementById("pre_search").style.display = 'block';
    }

    open = 1;
    setTimeout(function() { open = 0; }, 100);
}