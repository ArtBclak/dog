const res = () => {


    const hi = {
        r: [
            'привет, лох кожаный',
            'шо там',
            'киця мамина, иди в жопу',
            'здоровеньки булы',
        ]
    }
    const search = {
        r: [
            'опять парнуху ищем или что?',
            'так, завязывай, уже реально раздражаешь',
            'ты меня кидаешь тут одну? окей, лошара',
            'говорила мне мама не работать с мудаками',
        ]
    }
    const notFound = {
        r: [
            'Я вообще не понимаю, что ты хочешь, вытри слюни и скажи нормально!',
            'бла бла бла, я у мамы долбаеб',
            'петух тоже птаха, а ты птах',
            'опять болдой по лицу поводили',
        ]
    }

    const info = [
        {
            h: 'дура',
            r: [
                'рот твой ебала',
                'пойди поплачь маме',
                'ах ты петушара',
                'фуу быдлота',
            ]
        },
        {
            h: 'как дела',
            r: [
                'фарту масти, брат',
                'шо тут скажешь, все как всегда, сам как ?',
                'без сто грамм не расскажешь как мои дела',
                'та опять мусора приняли',
            ]
        },
        {
            h: 'лучше',
            r: [
                'лучше - это ты, мой король',
                'лучше - это заниматься сексом',
            ]
        },
        {
            h: 'хозяин',
            r: [
                'сасный Артём Повелитель',
                'я из Рода Заикиных, дальше думай сам',
            ]
        },
        {
            h: 'как тебя зовут',
            r: [
                'псина ебаная, шо не понятно',
                'у тебя смотрю с памятью все очень хреново, но не печалься, псина тебе поможет',
            ]
        }
    ]

    return {hi, notFound, search, info}
}

export default res