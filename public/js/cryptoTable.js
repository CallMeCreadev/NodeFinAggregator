document.addEventListener('DOMContentLoaded', () => {
    // Today's Coins Data
    const cryptoDataDiv = document.getElementById('crypto-data');
    const cryptoData = JSON.parse(cryptoDataDiv.getAttribute('data-crypto-variable'));
    const tableBody = document.getElementById('crypto-table-body');

    const keys = Object.keys(cryptoData);

    keys.forEach(key => {
        const coinData = cryptoData[key];
        const row = document.createElement('tr');

        const createCell = (text, isLink = false) => {
            const cell = document.createElement('td');
            if (isLink && text) {
                const link = document.createElement('a');
                link.href = text;
                link.textContent = text; // Set the text content of the link to the URL
                link.target = '_blank';
                cell.appendChild(link);
            } else {
                cell.textContent = text ? text : '-';
            }
            return cell;
        };

        row.appendChild(createCell(coinData.abbreviation));
        row.appendChild(createCell(coinData.CMC, true)); // Make this a hyperlink
        row.appendChild(createCell(coinData.market_cap));
        row.appendChild(createCell(coinData.volume_24h));
        row.appendChild(createCell(coinData.volume_24h_change));
        row.appendChild(createCell(coinData.price_change_24h));
        row.appendChild(createCell(coinData.price_change_all_time));
        row.appendChild(createCell(coinData["30d_twitter_followers"]));
        row.appendChild(createCell(coinData["30d_tweets"]));
        row.appendChild(createCell(coinData.chain));
        row.appendChild(createCell(coinData.address));

        tableBody.appendChild(row);
    });

    // Yesterday's Coins Data
    const cryptoYesterdayDataDiv = document.getElementById('crypto-yesterday-data');
    const cryptoYesterdayData = JSON.parse(cryptoYesterdayDataDiv.getAttribute('data-crypto-yesterday-variable'));
    const yesterdayTableBody = document.getElementById('crypto-yesterday-table-body');

    const yesterdayKeys = Object.keys(cryptoYesterdayData);

    yesterdayKeys.forEach(key => {
        const coinData = cryptoYesterdayData[key];
        const row = document.createElement('tr');

        const createCell = (text, isLink = false) => {
            const cell = document.createElement('td');
            if (isLink && text) {
                const link = document.createElement('a');
                link.href = text;
                link.textContent = text; // Set the text content of the link to the URL
                link.target = '_blank';
                cell.appendChild(link);
            } else {
                cell.textContent = text ? text : '-';
            }
            return cell;
        };

        row.appendChild(createCell(coinData.abbreviation));
        row.appendChild(createCell(coinData.CMC, true)); // Make this a hyperlink
        row.appendChild(createCell(coinData.price_change));

        yesterdayTableBody.appendChild(row);
    });
});
