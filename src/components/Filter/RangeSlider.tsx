import './styles/RangeSlider.css'

import React, { FC } from 'react';

interface Props {
  onChange: any;
  min: any;
  max: any;
}

export const RangeSlider: FC<Props> = ({ onChange, value, max = 100, min = 0 }) => {
  const [minValue, setMinValue] = React.useState(value.min)
  const [maxValue, setMaxValue] = React.useState(value.max)

  React.useEffect(() => {
    onChange({ min: minValue, max: maxValue })
  }, [minValue, maxValue])


  const onThumbDrag = (e) => {
    const { value, dataset } = e.target

    if (dataset.mark === 'min') {
      if (value < maxValue)
        setMinValue(parseInt(value))
    }
    else {
      if (value > minValue)
        setMaxValue(parseInt(value))
    }
  }

  return <section>
    <p>{minValue}</p>
    <input data-mark="min" onChange={onThumbDrag} type='range' min={min} max={max} value={minValue} />
    <input data-mark="max" onChange={onThumbDrag} type='range' min={min} max={max} value={maxValue} />
    <p>{maxValue}</p>
  </section>
}
