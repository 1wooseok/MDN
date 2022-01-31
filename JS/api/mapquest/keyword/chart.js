const h1 = document.querySelector('h1');
const ctx = document.getElementById('chart-prev');
const ctx2 = document.getElementById('chart-predict');

// 아파트 이름
h1.textContent = 'OO 아파트 ';

// 이전 가격 배열
let prev_data = [12, 19, 3, 5, 2, 300];
// 예측 가격 배열
let predict_data = [1200, 19, 300, 5, 2, 700];

const config = {
    type: 'line',
    data: {
        labels: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
        datasets: [
            {
                label: 'Price',
                // y축은 자동으로 갱신됨.
                data: prev_data,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '이전 가격'
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: '년도'
                }
            },
            y: {
                title: {
                    display: false,
                    text: '변곡량'
                }
            }
        },
    }
}

const config2 = {
    type: 'line',
    data: {
        labels: [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
        datasets: [
            {
                label: 'Price',
                // y축은 자동으로 갱신됨.
                data: predict_data,
                backgroundColor: 'salmon',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '예측 가격'
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: '년도'
                }
            },
            y: {
                title: {
                    display: false,
                    text: '변곡량'
                }
            }
        },
    }
}

const chart = new Chart(ctx, config);
const chart_predict = new Chart(ctx2, config2);