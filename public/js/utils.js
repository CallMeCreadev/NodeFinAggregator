class Utils {


     static identifiers = {
          HYG: "HYG: High Yield Corporate Bond",
          TLT: "TLT: 20 Year Treasury Bond",
          LQD: "LQD: Investment Grade Corporate Bond",
          AGG: "AGG: Aggreagate Bond ETF",
          BNDX: "BNDX: Non-US International Bond Fund",
          XLC: "XLC: Communication Services",
          XLY: "XLY: Consumer Discretionary",
          XLP: "XLP: Consumer Staples",
          XLE: "XLE: Energy",
          XLF: "XLF: Financials",
          XLV: "XLV: Health Care",
          XLI: "XLI: Industrial",
          XLB: "XLB: Materials",
          XLRE: "XLRE: Real Estate",
          XLK: "XLK: Technology", 
          XLU: "XLU: Utilities",
          DJI_SPY: "Dow Jones to SPY",
          QQQ_SPY: "Nasdaq to SPY",
          RUT_SPY: "Russel to SPY",
          HYG_SPY: "High Yield Corp Bonds to SPY",
          HGF_SPY: "Copper to SPY",
          EQW_SPY: "Equal Weight Index to SPY",
          all_purchases_to_sales: "Total -- ",
          executive_purchases_to_sales: "Executive (CFO, CEO, COO minimum 500k & 10% holdings) --",
          major_purchases_to_sales: "Major (5000k and min 20% of holdings) --"
     }




    static getValuesFromDictionary(dict, keys) {
        const firstValues = [];
        const secondValues = [];
      
        for (const key of keys) {
          const value = dict[key];
          if (value) {
            firstValues.push(value[0]);
            secondValues.push(value[1]);
          }
        }
        return [firstValues, secondValues];
    }


    static extractKeys(dict) {
        const keys = [];
      
        for (const key in dict) {
          if (dict.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
      
        return keys;
    }

    static divideListBySum(listA, listB) {
        const result = [];
      
        for (let i = 0; i < listA.length; i++) {
          const denominator = listA[i] + listB[i];
          const value = denominator !== 0 ? listA[i] / denominator : 0; 
          const pValue = value * 100
          const roundedResult = pValue.toFixed(2);
          result.push(roundedResult);
        }
      
        return result;
    }

    static createBinaryList(list) {
        const result = [];
      
        for (const value of list) {
          const binaryValue = value > 0 ? 0 : 1;
          result.push(binaryValue);
        }
      
        return result;
    }

    static createDict(strList, keyList) {
        let result = {};
        for (let i = 0; i < keyList.length; i++) {
          result[keyList[i]] = strList[i];
        }
        return result;
    }


    static parsePercentage(percentageString) {
     const value = parseFloat(percentageString.replace('%', '')) - 100;
     return parseFloat(value.toFixed(2));
   }


    static makeListPositive(list) {
        const result = [];
      
        for (const value of list) {
          const absoluteValue = Math.abs(value);
          result.push(absoluteValue);
        }
      
        return result;
    }


    static makeRatio(firstValues, secondValues) {
        
        let ratio;
        ratio = (100 * firstValues / (secondValues + firstValues)).toFixed(2) + "%";
        return ratio;
      }




    static getCardGivenLabels (labels) {
     let cardType = "None";
     if(labels.length == 5){
          cardType = "Bonds";
     }

     if (labels.length == 11) {
          cardType = "Sectors";
     }

     if(labels.length == 3){
          cardType = "Insiders";
     }

     if(labels.length == 4) {
          cardType = "Options";
     }

     if(labels.length == 6) {
          cardType = "Ratios";
     }
     return cardType   
    }


    
    


    static getRequestedData(id1, id2) {
     const globalDataElement = document.getElementById('global-data');
     const globalDataVariable = JSON.parse(globalDataElement.dataset.globalVariable);
     const key1 = `${id1}-${id2}`;
     const key2 = `${id2}-${id1}`;
 
     let dictionary = globalDataVariable[key1];
     if (!dictionary) {
       dictionary = globalDataVariable[key2];
     }
     return dictionary;
   }


    static getMinMaxFromDict(dict) {
     let resultDict = {};
     
     for (let key in dict) {
       let value = dict[key];
       let processedValue = Utils.parsePercentage(Utils.makeRatio(value[0], value[1]));   
       resultDict[key] = processedValue;
     }
     

     let maxKey = null;
     let maxValue = -Infinity;
     let minKey = null;
     let minValue = Infinity;
     
     for (let key in resultDict) {
       let value = resultDict[key];
       
       if (value > maxValue) {
         maxKey = key;
         maxValue = value;
       }
       
       if (value < minValue) {
         minKey = key;
         minValue = value;
       }
     }

     return {
       max: [maxKey, maxValue],
       min: [minKey, minValue]
     };
   }


   static addPercentSymbol(floatValue) {
     if (typeof floatValue === 'number') {
       return floatValue.toFixed(2) + '%';
     } else {
       return '';
     }
   }



   static descriptionCardHeading(key){
     let heading = ''
     if(key == 'week-bonds' || key == 'bonds-week') {
          heading = 'Comparative Bond Market Valuation (Weekly)' + '<br>';
     }
     if(key == 'month-bonds' || key == 'bonds-month'){
          heading = 'Comparative Bond Market Valuation (Monthly)'  + '<br>';
     }
     if(key == 'quarter-bonds' || key == 'bonds-quarter'){
          heading = 'Comparative Bond Market Valuation (Quarterly)'  + '<br>';
     }

     
     if(key == 'week-sectors' || key == 'sectors-week'){
          heading = 'Comparative Sector Market Valuation (Weekly)' + '<br>';
     }
     if(key == 'month-sectors' || key == 'sectors-month'){
          heading = 'Comparative Sector Market Valuation (Monthly)' + '<br>';
     }
     if(key == 'quarter-sectors' || key == 'sectors-quarter'){
          heading = 'Comparative Sector Market Valuation (Quarterly)' + '<br>';
     }
     
     if(key == 'week-insiders' || key == 'insiders-week'){
          heading = 'Insider Purchases & Sales Over the Week' + '<br>';
     }
     if(key == 'month-insiders' || key == 'insiders-month'){
          heading = 'Insider Purchases & Sales Over the Month' + '<br>';
     }
     if(key == 'quarter-insiders' || key == 'insiders-quarter'){
          heading = 'Insider Purchases & Sales Over the Quarter' + '<br>';
     }
     
     if(key == 'week-options' || key == 'options-week'){
          heading = 'Most Critical Options Expiration in Upcomming Week' + '<br>';
     }
     if(key == 'month-options' || key == 'options-month'){
          heading = 'Most Critical Options Expiration in Upcomming Month' + '<br>';
     }
     if(key == 'quarter-options' || key == 'options-quarter'){
          heading = 'Most Critical Options Expiration in Upcomming Quarter' + '<br>';
     }
     
     if(key == 'week-ratios' || key == 'ratios-week'){
          heading = 'Performance vs the S&P500 Over the Week' + '<br>';
     }
     if(key == 'month-ratios' || key == 'ratios-month'){
          heading = 'Performance vs the S&P500 Over the Month' + '<br>';
     }
     if(key == 'quarter-ratios' || key == 'ratios-quarter'){
          heading = 'Performance vs the S&P500 Over the Quarter' + '<br>';
     }

     return heading;
   }

   static descriptionFormatCard(requestData, id1, id2) {
     const key = `${id1}-${id2}`;

     if(key == 'week-options' || key == 'options-week'){
          const data = Utils.getRequestedData('meta-week', 'options');

          return  "Date:  " + data['date'] + '<br> ' +
                  "Total Options Interest:  " + data['total_OI'] + '<br> ' +
                  "Put to Call Ratio:  " + data['put_call_ratio'] + '<br> '
     }
     if(key == 'month-options' || key == 'options-month'){
          const data = Utils.getRequestedData('meta-month', 'options');
          return  "Date:  " + data['date'] + '<br> ' +
                  "Total Options Interest:  " + data['total_OI'] + '<br> ' +
                  "Put to Call Ratio:  " + data['put_call_ratio'] + '<br> '
     }
     if(key == 'quarter-options' || key == 'options-quarter'){
          const data = Utils.getRequestedData('meta-quarter', 'options');
          return  "Date:  " + data['date'] + '<br> ' +
                  "Total Options Interest:  " + data['total_OI'] + '<br> ' +
                  "Put to Call Ratio:  " + data['put_call_ratio'] + '<br> '
     }


     if(key == 'week-insiders' || key == 'insiders-week'){
         const dataAPS = requestData['all_purchases_to_sales'] 
         const dataEPS = requestData['executive_purchases_to_sales'] 
         const dataMPS = requestData['major_purchases_to_sales'] 

         return  "All-- Purchases:  " + dataAPS[0] +  " Sales:  "  + (dataAPS[0] + dataAPS[1]) +'<br> ' +
                   "Large Executive -- Purchases:  " + dataEPS[0] + " Sales:  " + (dataEPS[0] + dataEPS[1]) + '<br> ' +
                   "Major Position -- Purchases:  " + dataMPS[0] + " Sales:  " + (dataMPS[0] + dataMPS[1])  +'<br> '

       
     }
     if(key == 'month-insiders' || key == 'insiders-month'){
          const dataAPS = requestData['all_purchases_to_sales'] 
          const dataEPS = requestData['executive_purchases_to_sales'] 
          const dataMPS = requestData['major_purchases_to_sales'] 
 
          return  " All-- Purchases:  " + dataAPS[0] +  " Sales:  "  + (dataAPS[0] + dataAPS[1]) +'<br> ' +
          " Large Executive-- Purchases:  " + dataEPS[0] + " Sales:  " + (dataEPS[0] + dataEPS[1]) + '<br> ' +
          " Major Position-- Purchases:  " + dataMPS[0] + " Sales:  " + (dataMPS[0] + dataMPS[1])  +'<br> '
     }
     if(key == 'quarter-insiders' || key == 'insiders-quarter'){
          const dataAPS = requestData['all_purchases_to_sales'] 
          const dataEPS = requestData['executive_purchases_to_sales'] 
          const dataMPS = requestData['major_purchases_to_sales'] 
 
          return  "All-- Purchases:  " + dataAPS[0] +  " Sales:  "  + (dataAPS[0] + dataAPS[1]) +'<br> ' +
                   "Large Executive-- Purchases:  " + dataEPS[0] + " Sales:  " + (dataEPS[0] + dataEPS[1]) + '<br> ' +
                   "Major Position-- Purchases:  " + dataMPS[0] + " Sales:  " + (dataMPS[0] + dataMPS[1])  +'<br> '

     }
     else {
          const min_max = Utils.getMinMaxFromDict(requestData);
          const maxIdentifier = min_max["max"][0];
          const maxValue = min_max["max"][1];
          const minIdentifier = min_max["min"][0];
          const minValue = min_max["min"][1];
          return 'Max Gain' + '&#9;' + this.identifiers[maxIdentifier] + ' ' + Utils.addPercentSymbol(maxValue) + '<br>' +  'Max Loss' + '&#9;' + this.identifiers[minIdentifier] + ' ' + Utils.addPercentSymbol(minValue);
     }
     
   }


     static dataFormatterDescription(requestData, id1, id2) {
          const result = Utils.descriptionFormatCard(requestData, id1, id2)
          return result;
     }



     static getDiscriptions(requestData, id1, id2){

          const descriptionKey = `${id1}-${id2}`;
          const bondSectorRatio = Utils.dataFormatterDescription(requestData, id1, id2);    
          const heading = Utils.descriptionCardHeading(descriptionKey);
          
     
     
        return heading + bondSectorRatio;
     }


     static getDetailsForList(percentDiff, identifiers, labels, firstValues, secondValues){
          const result = [];
          const cardType = Utils.getCardGivenLabels(labels);
          let newString = "An error has occured with this section";

          for (let i = 0; i < labels.length; i++) {
               const element = labels[i];
               if(cardType === 'Bonds'){
                    if(identifiers[i] === 1){
                         newString =  this.identifiers[element] + " is currently outperforming the other Bonds types by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
                    else {
                         newString =  this.identifiers[element] + " is currently underperforming the other Bond types by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
                    
                }
                else if(cardType === 'Sectors'){
                    if(identifiers[i] === 1){
                         newString =  this.identifiers[element] + " is currently outperforming the other sectors by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
                    else {
                         newString =  this.identifiers[element] + " is currently underperforming the other sectors by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
 
                }
                else if(cardType === 'Insiders'){
                    if(identifiers[i] === 1){
                         newString =  this.identifiers[element] + " Purchases " + firstValues[i] + " Sales " + (firstValues[i] +secondValues[i]).toFixed(0);
                    }
                    else {
                         newString =  this.identifiers[element] + " Purchases " + firstValues[i] + " Sales " + (firstValues[i] +secondValues[i]).toFixed(0);
                    }
                    
                }
               else if(element === 'price_to_max_pain'){
                   if(identifiers[i] === 1){
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% above where the majority of contracts would expire OTM: " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }
                   else {
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% below where the majority of contracts would expire OTM: " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }
                   
               }
               else if(element === 'price_to_largest_call_OI'){
                   if(identifiers[i] === 1){
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% above the strike price for the largest number of call options: " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }
                   else {
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% below the strike price for the largest number of call options: " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }

               }
               else if(element === 'price_to_expected_high'){
                   if(identifiers[i] === 1){
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% above the calculated expected high:  " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }
                   else {
                        newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% below the calculated expected high:  " + (firstValues[i] +secondValues[i]).toFixed(2);
                   }

               }
               else if(element === 'price_to_expected_low'){
                    if(identifiers[i] === 1){
                         newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% above the calculated expected low: " + (firstValues[i] +secondValues[i]).toFixed(2);
                    }
                    else {
                         newString =  "The current SPY (S&P500) price is " + firstValues[i] + " which is " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "% below the calculated expected low: " + (firstValues[i] +secondValues[i]).toFixed(2);
                    }
 
                }
               else if(cardType === 'Ratios'){
                    if(identifiers[i] === 1){
                         newString =  this.identifiers[element] + " is outperforming by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
                    else {
                         newString =  this.identifiers[element] + " is underperforming by " +  Math.abs(((100-percentDiff[i]).toFixed(2))) + "%";
                    }
 
                }
               
          result.push(newString);

          }


        return result;
    }


  
}

 

  
  export  {Utils};