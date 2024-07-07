const countryName = new URLSearchParams(location.search).get("name");
const flagImage = document.querySelector(".country-details img");
const flagName = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const Population = document.querySelector(".population");
const Region = document.querySelector(".region");
const SubRegion = document.querySelector(".sub-region");
const Capital = document.querySelector(".capital");
const Domain = document.querySelector(".domain");
const Currency = document.querySelector(".currency");
const Languages = document.querySelector(".languages");
const borderCountryName = document.querySelector(".border-country");
const themeChanger = document.querySelector('.theme-changer');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImage.src = country.flags.svg;
    flagName.innerText = country.name.common;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    Population.innerText = country.population.toLocaleString("en-IN");
    Region.innerText = country.region;
    if (country.subregion) {
      SubRegion.innerText = country.subregion;
    }

    if (country.capital) {
      Capital.innerText = country.capital.join(", ");
    }
    Domain.innerText = country.tld.join(", ");
    if (country.currencies) {
      Currency.innerText = Object.values(country.currencies)
        .map((Curr) => Curr.name)
        .join(", ");
    }
    if (country.languages) {
      Languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            borderCountryName.append(borderCountryTag);
          });
      });
    }
  });

  
function toggleMode(){
  const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const newMode = currentMode === 'dark' ? 'light' : 'dark';
  document.body.classList.toggle('dark-mode',newMode === 'dark');
  document.body.classList.toggle('light-mode',newMode === 'light');
  localStorage.setItem('mode',newMode);
}

function applySavedMode(){
  const savedMode = localStorage.getItem('mode') || 'light';
  document.body.classList.add(savedMode + '-mode');
}
  
themeChanger.addEventListener('click', toggleMode);

applySavedMode();