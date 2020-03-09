export const config = {
    api: "https://00cfe854-087d-44d2-ae99-fe2f2debff4e.mock.pstmn.io",
    logout: ()=>window.location="../",
    result: () => window.location=`${window.location.href.replace('#basis', '')}#basis`,
    getUrlVars: () => {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
}