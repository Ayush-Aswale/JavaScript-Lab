const paraInput = document.getElementById('paraInput');

function getInputValue() {
  return paraInput.value.trim();
}

document.getElementById('btnFindVowels').addEventListener('click', function () {
  const text = getInputValue();
  const output = document.getElementById('resVowels');
  
  if (!text) {
    output.textContent = 'Please enter a paragraph first.';
    return;
  }

  const vowelMatches = text.match(/[aeiou]/gi);
  if (!vowelMatches) {
    output.textContent = 'No vowels found in the paragraph.';
    return;
  }

  const totalVowels = vowelMatches.length;
  output.textContent = `Total Vowels Count: ${totalVowels}`;
});

document.getElementById('btnReversePara').addEventListener('click', function () {
  const text = getInputValue();
  const output = document.getElementById('resReverse');

  if (!text) {
    output.textContent = 'Please enter a paragraph first.';
    return;
  }

  const reversed = text.split('').reverse().join('');
  output.textContent = reversed;
});
