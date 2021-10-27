
export const pattern = {
    integer: {
        mask: '^(?:-?[1-9]\\d*$)|(?:^0)$',
        pattern: 'Integer only',
        tight: true
    },

    mandatory: {
        mask:a=>(a != null && a != '' && a.trim()!=''),
        pattern:'This is a mandatory field.'
    },

    email: {
        mask:"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
        pattern:'You have entered an invalid email address!'
    },

    hkid: { 
        mask: '^([A-Z]{1,2})([0-9]{6})\\(([A0-9])\\)$', 
        pattern: 'AXXXXXX(X)'
    },

    password: {
        mask: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
        pattern: 'Minimum eight characters, at least one letter and one number'
    },

    creditCard: {
        mask: '^(?:4[0-9]{12}(?:[0-9]{3})?' +   // Visa
            '|(?:5[1-5][0-9]{2}' +              // MasterCard
            '|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}' +
            '|3[47][0-9]{13})$',                // American Express
        pattern: 'VISA xxxx xxxx xxxx xxxx | AMEX xxx xxxxxx xxxxx'
    }
} 

export const check = ({val, o}) => {
    let error = null

    //console.log(val, o.mask)

    if(o.mask && typeof o.mask=='function'){
        if(!o.mask(val))
            return o.pattern
    }

    if(o.mask && val !== '' && typeof o.mask!='function') {
        //console.log(val.match(new RegExp(o.mask)))
        if(val.match(new RegExp(o.mask)) === null)
            return o.pattern
    } 
    
    if(o.max && val > o.max)
        return `${val} is greater than ${o.max}`
    
    if(o.min && val < o.min)
        return `${val} is smaller than ${o.min}`

    if(val.length > o.len)
        return `Length is longer than ${o.len} characters`

    return error
}