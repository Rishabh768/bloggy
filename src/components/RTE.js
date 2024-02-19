import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
const RTE = ({name,control,label,defaultvalue=''}) => {

  return (
    <>
    <div>
    {label && <label>{label}</label>}
      <Controller
      name={name || 'content'}
      control={control}
      render={({field:{onChange}})=>(
       <Editor 
       apiKey='8puxskah30jkay0ntagetrxexrvhdwew2dc89a5p0yqr32e8'
       initialValue={defaultvalue}
       init={
        {
            initialValue:defaultvalue,
            height:500,
            menubar:true,
            plugins:['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],
            toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }
       }
       
       onEditorChange={onChange}
       />

      )}
      />
    </div>
    </>
  )
}

export default RTE