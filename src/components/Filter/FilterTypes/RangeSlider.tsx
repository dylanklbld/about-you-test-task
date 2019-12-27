import '../styles/RangeSlider.css'

import React, { FC, useEffect } from 'react';

import useEffectExceptMount from '../../../hooks/useEffectExceptMount.js'

interface Props {
  onChange: any;
  min: any;
  max: any;
}

export const RangeSlider: FC<Props> = ({ onChange, value, max = 100, min = 0, step = 1 }) => {
  const [minValue, setMinValue] = React.useState(value.min)
  const [maxValue, setMaxValue] = React.useState(value.max)

  useEffectExceptMount(() => {
    onChange({ min: minValue, max: maxValue })
  }, [minValue, maxValue])

  useEffectExceptMount(() => {
    if (min > minValue) setMinValue(min)
    if (max < maxValue) setMaxValue(max)
  }, [min, max])


  const handleChange = (e) => {
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
    <input type='number' data-mark="min" value={minValue} onChange={handleChange} />
    <input className="slider" data-mark="min" onChange={handleChange} type='range' min={min} max={max} value={minValue} />
    <input className="slider" data-mark="max" onChange={handleChange} type='range' min={min} max={max} value={maxValue} />
    <input type='number' data-mark="max" value={maxValue} onChange={handleChange} />
  </section>
}
