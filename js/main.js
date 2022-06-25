let toggleIconElement=document.getElementById('toggleIconElement');
let movieContainerElement=document.getElementById('movieContainerElement');
let searchByWordElement=document.getElementById('searchByWordElement');
let searchByMovieElement=document.getElementById('searchByMovieElement');
let nameInput=document.getElementById('nameInput');
let errorMassageName=document.getElementById('errorMassageName');
let phoneNumberInput=document.getElementById('phoneNumberInput');
let errorMassagephone=document.getElementById('errorMassagephone');
let ageInput=document.getElementById('ageInput');
let errorMassageAge=document.getElementById('errorMassageAge');
let passwordInput=document.getElementById('passwordInput');
let errorMassagePassword=document.getElementById('errorMassagePassword');
let rePasswordInput=document.getElementById('rePasswordInput');
let errorMassageRepassword=document.getElementById('errorMassageRepassword');
let emailInput=document.getElementById('emailInput');
let errorMassageEmail=document.getElementById('errorMassageEmail');
let movieArray=[];



  $('.toggle-icon').click(function(){
    let sideContentWidth=$('.sidebar-content').width();
    let sideNavWidth=$('.side-nav').width();
    let sideNavLeft=$('.side-nav').css('marginLeft');

    if( sideNavLeft <'0px'  )
    {
        $('.side-nav').animate({marginLeft:`0px`},500);
        toggleIconElement.innerHTML='<i class="fa-solid fa-xmark"></i>';
    }
    else 
    {
        $('.side-nav').animate({marginLeft:`-${sideContentWidth}px`},500);
        toggleIconElement.innerHTML='<i class="fa fa-align-justify"></i>';
    }
    new WOW().init();
  });

  async function getMovies(movieSatue='movie/now_playing')
  {
    let movies=await fetch(`https://api.themoviedb.org/3/${movieSatue}?api_key=b339567fd94884a0343e311bf63cef5c&language=en-US&page=1`);
    let response= await movies.json();
    let finalResult=response.results;
    movieArray=response.results;
    displayMovies(finalResult);
    console.log(movieArray);
  }

  function displayMovies(moviesList)
  {
    let temp = ``;
    for (let index = 0; index < moviesList.length; index++) {
        if(moviesList[index].media_type == 'tv')
        {
          temp += `
        <div class="  col-md-4 text-center   ">
                          <figure class="poster rounded-2 position-relative overflow-hidden" >
                              <img src="https://image.tmdb.org/t/p/w500${moviesList[index].poster_path}" class=" w-100" alt="movie-poster" class="w-100" alt="">
                              <figcaption class=" pic-caption position-absolute   px-3 w-100 h-100 rounded-2  d-flex align-items-center">
                                  <div class="poster-content">
                                   <h2>${moviesList[index].name}</h2>
                                   <p class="py-2">${moviesList[index].overview}</p>
                                   <p>rate: ${moviesList[index].vote_average}</p>
                                   <p>${moviesList[index].first_air_date}</p>
                                  </div>
                               </figcaption>
                          
                          </figure>
          </div>
        ` ;
        }
        else if (moviesList[index].media_type == 'movie' || moviesList[index].media_type == undefined)
        {
          temp += `
          <div class="  col-md-4 text-center   ">
                            <figure class="poster rounded-2 position-relative overflow-hidden" >
                                <img src="https://image.tmdb.org/t/p/w500${moviesList[index].poster_path}" class=" w-100" alt="movie-poster" class="w-100" alt="">
                                <figcaption class=" pic-caption position-absolute   px-3 w-100 h-100 rounded-2  d-flex align-items-center">
                                    <div class="poster-content">
                                     <h2>${moviesList[index].title}</h2>
                                     <p class="py-2">${moviesList[index].overview}</p>
                                     <p>rate: ${moviesList[index].vote_average}</p>
                                     <p>${moviesList[index].release_date}</p>
                                    </div>
                                 </figcaption>
                            
                            </figure>
            </div>
          ` ; 
        }
    }
    movieContainerElement.innerHTML=temp;
  }
  getMovies();
  $('.movie-list a[id]').click(async function(e){
    let IdLink=$(e.target).attr('id');
    if(IdLink == 'trending')
    {
      await getMovies('trending/all/day');
    }
    else
    {
      await getMovies(`movie/${IdLink}`);
    }
  })

  function searchByWord()
  {
    let searchList=[];
    for (let index = 0; index < movieArray.length; index++) {
      if(movieArray[index].media_type == 'tv')
      {
        if(movieArray[index].name.toLowerCase().includes(searchByWordElement.value.toLowerCase()) == true)
        {
          searchList.push(movieArray[index]);
        }
      }
      else if (movieArray[index].media_type == 'movie' || movieArray[index].media_type == undefined)
      {
        if(movieArray[index].title.toLowerCase().includes(searchByWordElement.value.toLowerCase()) == true)
        {
          searchList.push(movieArray[index]);
        }
      }
     
    }
    // console.log(searchList);
    displayMovies(searchList);
  }
  async function searchByMovieAPI()
  {
    let movies=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b339567fd94884a0343e311bf63cef5c&language=en-US&page=1&include_adult=false&query=${searchByMovieElement.value}`);
    let response= await movies.json();
    let finalResult=response.results;
    displayMovies(finalResult);
  }
  searchByWordElement.addEventListener('input', function(){
    searchByWord();
 });
  searchByMovieElement.addEventListener('input',async function(){
    await searchByMovieAPI();
  });
  function showErrorMassageName()
  {
    errorMassageName.classList.replace('d-none','d-flex');
    errorMassageName.innerHTML='Please Enter Valid Name Minimum 3 characters'
  }
  function hideErrorMassageName()
  {
    errorMassageName.classList.replace('d-flex','d-none');
  }
  function showErrorMassageEmail()
  {
    errorMassageEmail.classList.replace('d-none','d-flex');
    errorMassageEmail.innerHTML='Please Enter Valid Email'
  }
  function hideErrorMassageEmail()
  {
    errorMassageEmail.classList.replace('d-flex','d-none');
  }
  function showErrorMassagePhone()
  {
    errorMassagephone.classList.replace('d-none','d-flex');
    errorMassagephone.innerHTML='Please Enter Valid Phone Number'
  }
  function hideErrorMassagePhone()
  {
    errorMassagephone.classList.replace('d-flex','d-none');
  }
  function showErrorMassageAga()
  {
    errorMassageAge.classList.replace('d-none','d-flex');
    errorMassageAge.innerHTML='Please Enter Valid Age'
  }
  function hideErrorMassageAge()
  {
    errorMassageAge.classList.replace('d-flex','d-none');
  }
  function showErrorMassagePassword()
  {
    errorMassagePassword.classList.replace('d-none','d-flex');
    errorMassagePassword.innerHTML=' Please Entre valid password *Minimum eight characters, at least one letter and one number:*'
  }
  function hideErrorMassagePassword()
  {
    errorMassagePassword.classList.replace('d-flex','d-none');
  }
  function showErrorMassageRepassword()
  {
    errorMassageRepassword.classList.replace('d-none','d-flex');
    errorMassageRepassword.innerHTML='Please Enter Valid Rpassword'
  }
  function hideErrorMassageRepassword()
  {
    errorMassageRepassword.classList.replace('d-flex','d-none');
  }
function validateName()
{
  let regex=/^[a-zA-z]{3,8}$/;
  if(regex.test(nameInput.value) == true)
  {
    if(nameInput.classList.contains('is-invalid'))
    {
      nameInput.classList.replace('is-invalid','is-valid');
      hideErrorMassageName();
    }
    else
    {
      nameInput.classList.add('is-valid');
      hideErrorMassageName();
    }
  }
  else
  {
    if(nameInput.classList.contains('is-valid'))
    {
      nameInput.classList.replace('is-valid','is-invalid');
      showErrorMassageName();
    }
    else
    {
      nameInput.classList.add('is-invalid');
      showErrorMassageName();
    }
  }
}
function validateEmail()
{
  let regex=/^[a-zA-z0-9]{1,9}@[a-zA-Z]{1,9}\.com$/;
  if(regex.test(emailInput.value) == true)
  {
    if(emailInput.classList.contains('is-invalid'))
    {
      emailInput.classList.replace('is-invalid','is-valid');
      hideErrorMassageEmail();
    }
    else
    {
      emailInput.classList.add('is-valid');
      hideErrorMassageEmail();
    }
  }
  else
  {
    if(emailInput.classList.contains('is-valid'))
    {
      emailInput.classList.replace('is-valid','is-invalid');
      showErrorMassageEmail();
    }
    else
    {
      emailInput.classList.add('is-invalid');
      showErrorMassageEmail();
    }
  }
}
function validatePhoneNumber()
{
  let regex=/^((002){0,1}01[0125][0-9]{8}|(02){1}[0-9]{8})$/;
  if(regex.test(phoneNumberInput.value) == true)
  {
    if(phoneNumberInput.classList.contains('is-invalid'))
    {
      phoneNumberInput.classList.replace('is-invalid','is-valid');
      hideErrorMassagePhone();
    }
    else
    {
      phoneNumberInput.classList.add('is-valid');
      hideErrorMassagePhone();
    }
  }
  else
  {
    if(phoneNumberInput.classList.contains('is-valid'))
    {
      phoneNumberInput.classList.replace('is-valid','is-invalid');
      showErrorMassagePhone();
    }
    else
    {
      phoneNumberInput.classList.add('is-invalid');
      showErrorMassagePhone();
    }
  }
}
function validateAge()
{
  let regex=/^([1-9]|[1-9][0-9]|100)$/;
  if(regex.test(ageInput.value) == true)
  {
    if(ageInput.classList.contains('is-invalid'))
    {
      ageInput.classList.replace('is-invalid','is-valid');
      hideErrorMassageAge();
    }
    else
    {
      ageInput.classList.add('is-valid');
      hideErrorMassageAge();
    }
  }
  else
  {
    if(ageInput.classList.contains('is-valid'))
    {
      ageInput.classList.replace('is-valid','is-invalid');
      showErrorMassageAga();
    }
    else
    {
      ageInput.classList.add('is-invalid');
      showErrorMassageAga();
    }
  }
}
function validatePassword()
{
  let regex=/^(?=.*?[0-9])(?=.*?[a-zA-Z])([a-zA-Z0-9]{8,10})$/;
  if(regex.test(passwordInput.value) == true)
  {
    if(passwordInput.classList.contains('is-invalid'))
    {
      passwordInput.classList.replace('is-invalid','is-valid');
      hideErrorMassagePassword();
    }
    else
    {
      passwordInput.classList.add('is-valid');
      hideErrorMassagePassword();
    }
  }
  else
  {
    if(passwordInput.classList.contains('is-valid'))
    {
      passwordInput.classList.replace('is-valid','is-invalid');
      showErrorMassagePassword();
    }
    else
    {
      passwordInput.classList.add('is-invalid');
      showErrorMassagePassword();
    }
  }
}
function validateRepassword()
{

  if(rePasswordInput.value == passwordInput.value)
  {
    if(rePasswordInput.classList.contains('is-invalid'))
    {
      rePasswordInput.classList.replace('is-invalid','is-valid');
      hideErrorMassageRepassword();
    }
    else
    {
      rePasswordInput.classList.add('is-valid');
      hideErrorMassageRepassword();
    }
  }
  else
  {
    if(rePasswordInput.classList.contains('is-valid'))
    {
      rePasswordInput.classList.replace('is-valid','is-invalid');
      showErrorMassageRepassword();
    }
    else
    {
      rePasswordInput.classList.add('is-invalid');
      showErrorMassageRepassword();
    }
  }
}
nameInput.addEventListener('input',function(){
  validateName();
})
emailInput.addEventListener('input',function(){
  validateEmail();
})
phoneNumberInput.addEventListener('input',function(){
  validatePhoneNumber();
})
ageInput.addEventListener('input',function(){
  validateAge();
})
passwordInput.addEventListener('input',function(){
  validatePassword();
})
rePasswordInput.addEventListener('input',function(){
  validateRepassword();
})