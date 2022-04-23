/**
 * Detect words in a paragraph.
 * @type {RegExp}   ['word', 'word', ...]
 */
export const WORDS = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

/**
 * Detect a valid Venezuelan phone number (area code included)
 * @type {RegExp}
 */
export const TELEPHONE = /0(2(12|3[4589]|4[0-9]|[5-8][1-9]|9[1-5])|(4(12|14|16|24|26)))-?\d{7}/g

/**
 * Detect a valid email (RFC 5322 Standard)
 * @type {RegExp}
 */
export const MAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+/g

/**
 * Months of the year (in Spanish)
 * @type {Array}  ['enero', 'febrero', ...]
 */
export const MONTHS = Array.from({ length: 12  }, (e, i) => {
  return new Date(null, i + 1, null).toLocaleDateString('es', { month: 'long' })
})

/**
 * Colors of the Official Nord Palette
 * @type {Array}  [Colores]
 */
export const NORD_PALETTE = [
  '#2E3440', // Nord 0
  '#3B4252', // Nord 1
  '#434C5E', // Nord 2
  '#4C566A', // Nord 3
  '#D8DEE9', // Nord 4
  '#E5E9F0', // Nord 5
  '#ECEFF4', // Nord 6
  '#8FBCBB', // Nord 7
  '#88C0D0', // Nord 8
  '#81A1C1', // Nord 9
  '#5E81AC', // Nord 10
  '#BF616A', // Nord 11
  '#D08770', // Nord 12
  '#EBCB8B', // Nord 13
  '#A3BE8C', // Nord 14
  '#B48EAD', // Nord 15
]

/**
 * Default font style for first appeal font
 * @type {Object}
 */
export const DEFAULT_STYLES = {
  'font-size': '4rem',
  'font-family': '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', Helvetica, Arial, sans-serif'
}

/**
 * Days of the week (in Spanish)
 * @type {Array}  ['domingo', 'lunes', ...]
 */
export const DAYS = Array.from({ length: 7  }, (e, i) => {
  return new Date(null, null, i).toLocaleDateString('es', { weekday: 'long' })
})

/**
 * Return if a year is a leap year
 * @param  {Number} $year [Full year (Format: AAAA)]
 * @return {Boolean}       [it is a leap year?]
 */
export const isLeapYear = ($year) =>
  ($year % 4 === 0) && ($year % 100 === 0) && ($year % 400 === 0)

/**
 * Return info about a date given
 * @param  {Date}   $date [Date given]
 * @return {Object}       [day, month, year, date and first and last days]
 */
export const aboutDate = ($date = new Date()) => {
  const [year, month, day, date] = [$date.getFullYear(), $date.getMonth(), $date.getDay(), $date.getDate()]
  return {
    date, day, month, year,
    firstDayOfMonth: new Date(year, month, 1),
    lastDayOfMonth: new Date(year, month + 1, 0)
  }
}

/**
 * Dettached event handling for heavy CPU events (such resize or scroll)
 * @param  {Function} $fn [Handler of the event]
 * @param  {Number}   $ms [Debounce time]
 * @return {Function}     [Debounced callback handler]
 */
export const debounce = ($fn, $ms = 0) => {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => $fn.apply(this, args), $ms)
  }
}

/**
 * Take no operation in functional flows, returning its param
 * @param  {Any} $v [Value from functional flow]
 * @return {Any}    [Value from functional flow]
 */
export const noop = $v => ($v)

/**
 * Returns a closure that returns the parameter (Identity)
 * @param  {Any}      $v  [Value from functional flow]
 * @return {Function}     [Closure that returns same value from flow]
 */
export const same = $v => () => ($v)

/**
 * Pretty self explanatory wrapper for boolean comparisons
 * @param  {Boolean} $v1 [Any Boolean expression]
 * @param  {Boolean} $v2 [Any Boolean expression]
 * @return {Boolean}
 */
export const not = $v => (!$v)
export const eq = ($v1, $v2) => ($v1 === $v2)
export const and = ($v1, $v2) => ($v1 && $v2)
export const or = ($v1, $v2) => ($v1 || $v2)
export const xor = ($v1, $v2) => (($v1 || $v2) && !($v1 && $v2))

/**
 * Compare if the object-like value has the instance as self-constructor
 * @param  {Any<Object>} $v           [Object-like value to compare]
 * @param  {Any<Object>} $constructor [Array, Object, Date, String,...]
 * @return {Boolean}
 */
export const isConstructor = ($v, $constructor) =>
  ($v.constructor === $constructor)

/**
 * Compare if the object-like value reference belongs to the instance
 * @param  {Any<Object>} $v        [Object-like value to compare]
 * @param  {Any<Object>} $instance [Array, Object, Date, String,...]
 * @return {Boolean}
 */
export const isInstance = ($v, $instance) => ($v instanceof $instance)

/**
 * Determine if the value is primitive (or if it belongs to some primitive)
 * @param  {Any}    $v    [Value to check if it's primitive]
 * @param  {String} $type [Optional: primitive name]
 * @return {Boolean}
 */
export const isPrimitive = $v =>
  ['string', 'boolean', 'number', 'symbol', 'undefined']
    .includes(() => typeof $v)

/**
 * Debug values on console
 * @param  {Object}  $value     [Value to show on console]
 * @param  {Boolean} $isTable   [Flag for set callback to table]
 * @param  {Boolean} $setError  [Flag for show formatted error messages]
 * @return {Null}               [console.log or console.table]
 */
export const log = ($value, $isTable = false, $setError = false) => {
  const debugCallback = $isTable ? console.table : console.log
  const debug = [($setError ? `%c${$value}` : $value)]

  if ($setError) debug.push('color: #BF616A')

  debugCallback(...debug)
}

/**
 * Clean all undefined, null and falsy values from an array
 * @param  {Array} $arr [Array with falsy values]
 * @return {Array}      [Array cleaned]
 */
export const clean = ($arr) => $arr.filter(Boolean)

/**
 * Return an array with no repeated elements, given the array
 * @param  {Array} $arr [Array with repeated elements]
 * @return {Array}      [Array with unique elements]
 */
export const uniques = $arr => [...new Set($arr)]

/**
 * Chop an array into equally chunks of elements
 * @param  {Array}  $array  [Array to chop]
 * @param  {Number} $size   [Optional: Length of the chunk]
 * @return {Array}          [Copy of 'chunked' array]
 */
export const chunk = ($array, $size = 2) =>
  Array.from({ length: Math.ceil($array.length / $size) }, (v, i) =>
    $array.slice(i * $size, i * $size + $size))

/**
 * Generate a new array from a pattern $size times
 * @param   {Number}  $size [Size of the array to generate]
 * @param   {Array}   $pat  [Pattern of the array to fill]
 * @return  {Array}         [Array with pattern]
 */
export const pattern = ($size = 1, $pat = [0]) =>
  Array($size).fill($pat).flat()

/**
 * Flatten an array
 * @param  {Array}  $arr [Array to flatten]
 * @param  {Number} $lvl [Level of nesting to flat]
 * @return {Array}       [Flatten array]
 */
export const flatten = ($arr, $lvl = Infinity) => $arr.flat($lvl)

/**
 * Return a suffix to a external string to plularize it
 * @param  {Number} counter [Number to detect if plural needed]
 * @param  {String} suffix  [Suffix set to pluralize]
 * @return {String}         [Suffix to pluralize]
 */
export const pluralize = (counter, suffix = 's') =>
  (counter === 1 ? '' : suffix)

/**
 * Do anything with an opinated Fibonacci series generator
 * @param  {Number}   $end [End of the fibonacci series to generate]
 * @param  {Function} $cb  [Callback to execute on each fibonacci series term]
 * @return {Null}
 */
export const fibonacciUntil = ($end, $cb) => {
  for (let i = 0, next = 1; i < $end; [i, next] = [next, next + i]) {
    $cb(next)
  }
}

/**
 * Generate a range of consecutive integer numbers
 * @param  {Number} $from [lower limit of the range]
 * @param  {Number} $to   [upper limit of the range]
 * @param  {Number} $step [steps between numbers]
 * @return {Array}        [Array of consecutive numbers]
 */
export const range = ($from, $to, $step = 1) => {
  if ($from >= $to) return [$from]
  return [$from, ...range($from + $step, $to, $step)]
}

/**
 * Get decimal code from a single character
 * @param  {String} $char [One character]
 * @return {Number}       [Decimal code of the character]
 */
export const charToCode = $char => $char.charCodeAt(0)

/**
 * Get a character from a valid decimal code
 * @param  {Number} $code [Decimal code of the character]
 * @return {String}       [Single character]
 */
export const charFromCode = $code => String.fromCharCode($code)

/**
 * Set the first letter of the string to uppercase
 * @param  {String} $str [String to convert]
 * @return {String}      [Cased string]
 */
export const toTitleCase = $str =>
  $str
    .match(WORDS)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ')

/**
 * Set a string to a 'sArCaStIc StRiNg'
 * @param  {String} $str) [String to convert]
 * @return {String}       [Cased string]
 */
export const toSarcasticCase = $str =>
  [...$str].map((c, i) =>
    i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('')

/**
 * Set any phrase into-spinal-case-phrase (useful for seed urls)
 * @param  {String} $str [String to convert]
 * @return {String}      [Cased string]
 */
export const toSpinalCase = $str =>
  $str
    .match(WORDS)
    .map(word => word.tolowerCase())
    .join('-')

/**
 * Query selector of DOM elements (can select one or many)
 * @param  {String}  $query   [Valid DOM Selector]
 * @param  {Boolean} $all     [Flag to return one or all selected elements]
 * @param  {Element} $node    [Root node element to start seeking out]
 * @return {Array or Element} [Depends on flag $all can select one or all]
 */
export const Q = ($query, $all = false, $node = document) =>
  $all ? [...$node.querySelectorAll($query)] : $node.querySelector($query)

/**
 * Append children nodes to a single parent (both are required)
 * @param  {Element}        $parent   [Parent DOM element]
 * @param  {Array<Element>} $children [Array of DOM elements]
 * @return {Null}
 */
export const append = ($parent, $children) => $parent.append(...$children)

/**
 * Attach a handler event to a DOM element
 * @param  {String}   $eventName [Valid name of a Javascript event]
 * @param  {Function} $cb        [Event handler name or callback]
 * @param  {Element}  $el        [Element to attach event]
 * @return {Null}
 */
export const on = ($eventName, $cb, $el = window) =>
  $el.addEventListener($eventName, $cb)

/**
 * Main thread of any script
 * @param  {Function} $callback [Function to exec]
 * @return {Null}
 */
export const init = ($callback) => (on("DOMContentLoaded", $callback))

/**
 * Dettach a handler event to a DOM element
 * @param  {String}   $eventName [Valid name of a Javascript event]
 * @param  {Function} $cb        [Event handler name or callback]
 * @param  {Element}  $el        [Element to dettach event]
 * @return {Null}
 */
export const off = ($eventName, $cb, $el = window) =>
  $el.removeEventListener($eventName, $cb)

/**
 * Return a random integer number between 0 and 'top'
 * @param  {Number} top [Upper range of the random number]
 * @return {Number}     [Number between 0 and 'top']
 */
export const randomize = $top => Math.floor(Math.random() * ($top))

/**
 * Get all permutations of the sub-array
 * combine([[1, 2], [4, 5]]) //return [[1, 4], [1, 5], [2, 4], [2, 5]]
 * @param  {Array} arr [Array of arrays]
 * @return {Array}     [Combined array of arrays]
 */
export const combine = $arr =>
  $arr.reduce((a, b) => a.flatMap(x => b.map(y => [...x, y])), [[]])

/**
 * Merge two objects into one (overwriting its properties)
 * @param  {Object} $target [Object to extend]
 * @param  {Object} $source [Object to extend into]
 * @return {Object}         [Extended object (with overwritten properties)]
 */
export const extend = ($target, $source) => ({ ...$target, ...$source  })

/**
 * Merge two or more complex or nested objects (1-level deep)
 * @param  {Object ^ n} objs [Any objects as params]
 * @return {Object}          [Merged objects into one]
 */
export const merge = (...$objs) =>
  [...$objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = k in acc
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k]
        return acc
      }, {})
  , {})

/**
 * Transform a HTML dataform into an object
 * @param  {HTMLFormElement} $form [Form data from the DOM]
 * @return {Object}                [Data transformed (as object)]
 */
export const formToObject = ($form = document.forms[0]) =>
  Array.from(new window.FormData($form)).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }), {}
  )

/**
 * Serialize a HTML dataform into URL query string
 * @param  {HTMLFormElement} form [description]
 * @return {String} [query string. e.g., user=name&email=mail%40mail%20com]
 */
export const serializeForm = $form =>
  Array.from(new window.FormData($form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&')

/**
 * Correlate two arrays as its indexes
 * @param  {Array} $arr1   [First array to combine, e.g. [a, b]]
 * @param  {Array} $arr2   [Second array to combine, e.g. [1, 2]]
 * @return {Array}         [Zipped array, e.g. [[a, 1], [b, 2]]]
 */
export const zip = ($arr1, $arr2) => $arr1.map((k, i) => [k, $arr2[i]])

/**
 * Associates properties to values, given array of valid properties
 * - If $props.length > $values.length, remaining keys will be undefined.
 * - If $values.length > $props.length, remaining values will be ignored.
 * @param  {Array} $props  [Property keys array]
 * @param  {Array} $values [Values array]
 * @return {Object}        [Zipped Object (with conditions above)]
 */
export const zipObject = ($props, $values) => {
  const obj = {}
  $props.forEach((key, index) => {
    obj[key] = $values[index]
  })
  return obj
}

/**
 * Converts an array of object values by specified $key
 * @param  {Array<Object>} $arr [Array of objects to be plucked]
 * @param  {String}        $key [Key name to be plucked]
 * @return {Array}              [Plucked values from array of objects]
 */
export const pluck = ($arr, $key) => $arr.map(i => i[$key])

/**
 * Pick key-value pairs from object by a condition
 * @param  {Object}        $obj [Object from picking key-value pairs]
 * @param  {Array<String>} $arr [Array of keys (string)]
 * @return {Object}             [Object with key-value pairs picked]
 */
export const pick = ($obj, $arr) =>
  $arr.reduce(($acc, $curr) => {
    ($curr in $obj) && ($acc[$curr] = $obj[$curr])
    return $acc
  }, {})

/**
 * Omit key-value pairs from an object by a condition
 * @param   {Object}   $obj [Object from omitting key-value pairs]
 * @param   {Function) $by  [Condition to use as filter]
 * @return  {Object}        [Object with key-value pairs omitted]
 */
export const omitBy = ($obj, $by) =>
  Object.entries($obj)
    .filter($by)
    .reduce(($acc, $pair) => ({[$pair[0]]: $pair[1], ...$acc})
    , {})
/**
 * Detect if a number is into a range (both limits included)
 * @param  {Number}   $val  [Value to be compared]
 * @param  {Number}   $low  [Lower limit]
 * @param  {Number}   $high [Upper limit]
 * @return {Boolean}
 */
export const isBetween = ($val, $low, $high) =>
  ($val >= $low && $val <= $high)

/**
 * Delete many elements of the array
 * @param  {Array} $arr            [Array of elements to search]
 * @param  {Array} $itemsToExclude [Array of elements to exclude]
 * @return {Array}                 [Copy of array with excluded elements]
 */
export const exclude = ($arr, $itemsToExclude) =>
  $arr.filter(item => !$itemsToExclude.includes(item))

/**
 * Set content of a valid DOM element (created or queried)
 * @param  {Element} $el      [DOM element to set content]
 * @param  {String}  $content [Content]
 * @return {Null}
 */
export const setContent = ($el, $content) => ($el.innerHTML = $content)

/**
 * Use window.getComputedStyle to get the value of a rulename from an element
 * @param  {Element} $el       [description]
 * @param  {String}  $ruleName [description]
 * @return {String}            [description]
 */
export const getStyle = ($el, $ruleName) =>
  window.getComputedStyle($el)[$ruleName]

/**
 * Apply the rules as styles to the element
 * @param  {Element} $el         [DOM element to set styles]
 * @param  {Object}  $stylesheet [Styles as in CSS {'font-size': '2rem'}]
 * @return {Null}
 */
export const setStyle = ($el, $stylesheet) => {
  for (const rule in $stylesheet) {
    $el.style[rule] = $stylesheet[rule]
  }
}

/**
 * Set attributes
 * @param  {Element} $el    [DOM element to set attribute]
 * @param  {Object}  $attrs [Attributes object ({name: value})]
 * @return {Null}
 */
export const set = ($el, $attrs) => {
  for (const key in $attrs) {
    $el.setAttribute(key, $attrs[key])
  }
}

/**
 * Detect if a DOM element (created or queried) has a class
 * @param  {Element} $el        [DOM element]
 * @param  {String}  $className [Name of the class]
 * @return {Boolean}
 */
export const hasClass = ($el, $className) => $el.classList.contains($className)

/**
 * Add one or many classes to a DOM element (created or queried)
 * @param  {Element} $el        [DOM element]
 * @param  {String}  $className [Class(es) to add]
 * @return {Null}
 */
export const addClass = ($el, $className) =>
  $className.includes(' ')
    ? $el.classList.add(...$className.split(' '))
    : $el.classList.add($className)

/**
 * Remove one or many classes from a DOM element (created or queried)
 * @param  {Element} $el        [DOM element]
 * @param  {String}  $className [Class(es) to remove]
 * @return {Null}
 */
export const removeClass = ($el, $className) =>
  $className.includes(' ')
    ? $el.classList.remove(...$className.split(' '))
    : $el.classList.remove($className)

/**
 * Toggle a class on a DOM element (created or queried)
 * @param  {Element} $el        [DOM element]
 * @param  {String}  $className [Class to toggle]
 * @return {Null}
 */
export const toggleClass = ($el, $className) =>
  $el.classList.toggle($className)

/**
 * Create a DOM element (with optional classes included)
 * @param  {String}  $el        [Tag name of the element to create]
 * @param  {String}  $className [(Optional) Name of the class(es) to add]
 * @return {Element}            [DOM element]
 */
export const create = ($className = '', $el = 'div') => {
  const $elem = document.createElement($el)
  if ($className.length) {
    $elem.className = $className
  }
  return $elem
}

/**
 * Set navbar responsive behavior(*)
 *
 * (*) Only if working with Bulma CSS Framework
 */
export const setResponsiveNavbarMenu = () => {
  on('DOMContentLoaded', () => {
    const $navbarBurgers = Q('.navbar-burger', true)
    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        on('click', () => {
          const $target = Q(`#${el.dataset.target}`)
          toggleClass(el, 'is-active')
          toggleClass($target, 'is-active')
        }, el)
      })
    }
    const $navbarBox = Q('.is-boxed')
    const $navbarLink = Q('.navbar-link')
    on('click', () => { toggleElement($navbarBox)  }, $navbarLink)
  }, document)
}

/**
 * Show modal element(*)
 *
 * (*) Only if working with Bulma CSS Framework
 *
 * @param  {String} $template [HTML modal template content as string]
 * @return {Null}
 */
export const showModal = $template => (ev) => {
  const modal = Q('.modal')

  addClass(modal, 'is-active')

  const close = Q('.modal-close', false, modal)
  const closeBackground = Q('.modal-background', false, modal)

  on('click', () => removeClass(modal, 'is-active'), close)
  on('click', () => removeClass(modal, 'is-active'), closeBackground)

  const content = Q('.modal-card-body', false, modal)

  content.innerHTML = $template
}

/**
 * Show a DOM element (created or queried)
 * @param  {Element} $el [DOM element]
 * @return {Null}
 */
export const show = $el => ($el.style.display = '')

/**
 * Hide a DOM element (created or queried)
 * @param  {Element} $el [DOM element]
 * @return {Null}
 */
export const hide = $el => ($el.style.display = 'none')

/**
 * Detect if a DOM element (created or queried) is hidden
 * @param  {Element} $el [DOM element]
 * @return {Boolean}
 */
export const isHidden = $el => ($el.style.display === 'none')

/**
 * Show or hide a DOM element (created or queried)
 * @param  {Element} $el [DOM element]
 * @return {Null}
 */
export const toggleElement = $el => (
  $el.style.display = ($el.style.display === 'none')
    ? ''
    : 'none'
)

/**
 * Apply a fade-in or fade-out transition to a single DOM element., e.g:
 * fade($el)                  // fade-in element
 * fade($el, false)           // fade-out element
 * fade($el, true, 50)        // faster fade-in
 * fade($el, false, 10, 0.1)  // smoother fade-out
 * @param  {Element}  $el     [DOM element]
 * @param  {Boolean}  $in     [Apply a fade-in or fade-out transition]
 * @param  {Number}   $delay  [Duration of every step of the transition]
 * @param  {Number}   $step   [Opacity step variation]
 * @return {Null}
 */
export const fade = ($el, $in = true, $delay = 100, $step = 0.05) => {
  let opacity = $in ? 0 : 1
  let isFadeEnd
  const fadeDuration = setInterval(() => {
    isFadeEnd = $in ? (opacity < 1) : (opacity > 0)
    if (isFadeEnd) {
      opacity = $in ? opacity + $step : opacity - $step
      $el.style.opacity = opacity
    } else {
      clearInterval(fadeDuration)
    }
  }, $delay)
}

/**
 * Return an object of counters from ocurrencies of an array
 * @param  {Array} $list [Array of elements (normally primitive ones)]
 * @return {Object}      [Counters of ocurrencies]
 */
export const howMany = $list =>
  $list.reduce(($counter, $look) => {
    $counter[$look] = (+$counter[$look] || 0) + 1
    return $counter
  }, {})

/**
 * Returns metainfo about a DOM element
 * @param  {Element} $el  [DOM element]
 * @return {Object}
 */
export const who = $el => (
  {
    type: {
      1: 'DOM Element',
      3: 'Text',
      4: 'CDATA',
      7: 'XML',
      8: 'Comment',
      9: 'Document Root',
      10: 'DOCTYPE',
      11: 'Document Fragment'
    }[$el.nodeType] || 'DEPRECATED',
    parent: $el.parentNode,
    hasChildren: $el.hasChildNodes(),
    children: $el.children && [...$el.children],
  }
)

/**
 * Returns an object with the upperleft coordinate of a DOM element
 * @param  {Element} $el  [DOM element]
 * @return {Object}       [{top: from top, left: from left}]
 */
export const where = $el => ({ top: $el.offsetTop, left: $el.offsetLeft })

/**
 * Expose a conditional execution of functions given
 * @param  {Object} $config [{
 *   if: condition callback (must return a boolean)
 *   then: callback to execute if condition is true
 *   else: callback to execute if condition is false
 * }]
 * @param  {Any}    $params [Any params needed for callbacks]
 * @return {Null}
 */
export const when = $config => $params =>
  $config.if($params) ? $config.then($params) : $config.else($params)

/**
 * Compose multiple functions, when the result of the first function on
 * the array is the parameter of the next callback execution
 * @param  {Array<Function>} $fns   [Array of functions]
 * @return {Null}
 */
export const compose = (...$fns) => $x => $fns.reduce((v, f) => f(v), $x)

/**
 * Can execute multiple unary functions in sequence. Always return the
 * foremost result as a param for $next function or as the end result.
 * @param   {Any} $value  [First value to setup pipe]
 * @return  {Object}
 */
export const pipe = ($value) =>
  ({ next: ($fn) => pipe($fn($value)), done: ($fn) => $fn($value) })
/**
 * Detect if a DOM element (created or queried) exists in the actual page
 * @param  {Element} $el [DOM element]
 * @return {Boolean}
 */
export const isInPage = $el =>
  (($el === document.body) || document.body.contains($el))

/**
 * Transform a fetch() call response to a JSON response
 * @param  {Promise} $response [Result of a fetch() call]
 * @return {Promise}           [Response in JSON format]
 */
export const toJSON = $response => $response.json()

/**
 * Transform a fetch() call response to a TEXT response
 * @param  {Promise} $response [Result of a fetch() call]
 * @return {Promise}           [Response in TEXT format]
 */
export const toTEXT = $response => $response.text()

/**
 * Pad a number with a number of left zeroes
 * @param  {Number} $n [Number to pad]
 * @param  {Number} $z [Number of zeroes to pad - 1]
 * @return {String}    [Zero-padded number]
 */
export const padNumber = ($n, $z = 2) => `${$n}`.padStart($z, '0')

/**
 * Format a date in Timezone in Spanish format date
 * @param  {Date}   $date [Valid Javascript Date]
 * @param  {Object} $op   [Options for localeDateString]
 * @return {Object}       [{ date: DD/MM/YYYY, time: HH:MM:SS, turn: am|pm }]
 */
export const formatDate = ($date = new Date(), $op = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: true
  }) => {

  const arrDate = $date.toLocaleDateString('es', $op).split(' ')
  const formatter = ['date', 'time', 'turn']
  return Object.fromEntries(formatter.map((k, i) => [k, arrDate[i]]))
}

/**
 * Replace '{}' for dynamic values into the given string
 * @param  {String} $str   [String to replace]
 * @param  {Any}    $args  [Any arguments to insert into]
 * @return {String}        [Formatted string]
 */
export const formatString = ($str, ...$args) => {
  let i = 0
  return $str.replace(/{}/g, () => {
    return typeof $args[i] !== 'undefined' ? $args[i++] : ''
  })
}

/**
 * Bind a memoization process to a function
 * @param  {Function} $fn [Function to be memoized]
 * @return {Function}     [Memoized function]
 */
export const memoize = $fn => new Proxy($fn, {
  cache: new Map(),
  apply (target, thisArg, argsList) {
    const cacheKey = argsList.toString()
    if (!this.cache.has(cacheKey)) {
      this.cache.set(cacheKey, target.apply(thisArg, argsList))
    }
    return this.cache.get(cacheKey)
  }
})

/**
 * Generate an UUID
 * @return {String} [Valid UUID, e.g. '136de969-1f37-4677-b2f8-615317a63749']
 */
export const generateUUID = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (
      window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))
    )).toString(16))

/**
 * Given a formatted string as an HSL color, change its lightness $delta times
 * @param  {Number} $delta  [< 0 gets lighten color, > 0 gets darken color]
 * @param  {String} $hslStr [HSL valid string color, e.g. 'hsl(210,39%,59%)']
 * @return {String}         [HSL color lightened or darkened]
 */
export const changeLightness = ($delta, $hslStr) => {
  const [hue, saturation, lightness] = $hslStr.match(/\d+/g).map(Number)

  const newLightness = Math.max(
    0,
    Math.min(100, lightness + parseFloat($delta))
  )

  return `hsl(${hue}, ${saturation}%, ${newLightness}%)`
}

/**
 * Convert the three values of an HSL color to RGB (aprox.)
 * @param  {Number} $hue [Color Hue (0 ~ 360)]
 * @param  {Number} $sat [Color Saturation (0 ~ 100)]
 * @param  {Number} $lig [Color Lightness (0 ~ 100)]
 * @return {Array}       [Array of values ['RED', 'GREEN', 'BLUE'] (0 ~ 255)]
 */
export const HSLtoRGB = ($hue, $sat, $lig) => {
  $sat /= 100
  $lig /= 100
  const k = n => (n + $hue / 30) % 12
  const a = $sat * Math.min($lig, 1 - $lig)
  const f = n =>
    $lig - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

/**
 * Convert the three values of an RGB color to HSL (aprox.)
 * @param  {Number} $r [Red variation of the color (0 ~ 255)]
 * @param  {Number} $g [Green variation of the color (0 ~ 255)]
 * @param  {Number} $b [Blue variation of the color (0 ~ 255)]
 * @return {Array}     [Array of values ['HUE', 'SATURATION', 'LIGHTNESS']]
 */
export const RGBtoHSL = ($r, $g, $b) => {
  $r /= 255
  $g /= 255
  $b /= 255
  const l = Math.max($r, $g, $b)
  const s = l - Math.min($r, $g, $b)
  const h = s
    ? (l === $r)
      ? ($g - $b) / s
      : (l === $g)
        ? 2 + ($b - $r) / s
        : 4 + ($r - $g) / s
    : 0
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2
  ]
}

/**
 * Convert the three values of an RGB color to its hexadecimal representation
 * @param  {Number} $r [Red variation of the color (0 ~ 255)]
 * @param  {Number} $g [Green variation of the color (0 ~ 255)]
 * @param  {Number} $b [Blue variation of the color (0 ~ 255)]
 * @return {String}    [Hex string of the color #000000 to #ffffff]
 */
export const RGBtoHEX = ($r, $g, $b) =>
  (($r << 16) + ($g << 8) + $b).toString(16).padStart(6, '0')

/**
 * Converts the string as rgb string representation
 * @param  {String} $hex [#000000 to #ffffff]
 * @return {String}      ['rgb(a)(0~255, 0~255, 0~255)']
 */
export const HEXToRGB = ($hex) => {
  const ONLY_GREEN_ALPHA = 0x00FF0000
  const ONLY_BLUE_ALPHA = 0x0000FF00
  const ONLY_GREEN = 0x00FF00
  const ONLY_BLUE = 0x0000FF
  const ONLY_ALPHA = 0x000000FF
  let alpha = false
  let h = $hex.slice($hex.startsWith('#') ? 1 : 0)
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('')
  } else if (h.length === 8) {
    alpha = true
  }
  h = parseInt(h, 16)
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? ONLY_GREEN_ALPHA : ONLY_GREEN)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? ONLY_BLUE_ALPHA : ONLY_BLUE)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & ONLY_ALPHA}` : '') +
    ')'
  )
}