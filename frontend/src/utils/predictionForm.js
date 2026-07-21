const REQUIRED_MESSAGE = 'This field is required.'

export function validatePredictionForm(form) {
  const errors = {}

  if (!['1', '2', '3'].includes(form.pclass)) {
    errors.pclass = 'Choose a passenger class.'
  }

  if (!['male', 'female'].includes(form.sex)) {
    errors.sex = 'Choose male or female.'
  }

  const age = Number(form.age)
  if (form.age === '') {
    errors.age = REQUIRED_MESSAGE
  } else if (!Number.isFinite(age) || age < 0 || age > 120) {
    errors.age = 'Enter an age between 0 and 120.'
  }

  const fare = Number(form.fare)
  if (form.fare === '') {
    errors.fare = REQUIRED_MESSAGE
  } else if (!Number.isFinite(fare) || fare < 0 || fare > 600) {
    errors.fare = 'Enter a fare between 0 and 600.'
  }

  const sibsp = Number(form.sibsp)
  if (!Number.isInteger(sibsp) || sibsp < 0 || sibsp > 10) {
    errors.sibsp = 'Choose a value from 0 to 10.'
  }

  const parch = Number(form.parch)
  if (!Number.isInteger(parch) || parch < 0 || parch > 10) {
    errors.parch = 'Choose a value from 0 to 10.'
  }

  if (!['S', 'C', 'Q'].includes(form.embarked)) {
    errors.embarked = 'Choose a port of embarkation.'
  }

  return errors
}

export function toPredictionPayload(form) {
  return {
    pclass: Number(form.pclass),
    sex: form.sex,
    age: Number(form.age),
    sibsp: Number(form.sibsp),
    parch: Number(form.parch),
    fare: Number(form.fare),
    embarked: form.embarked,
  }
}
