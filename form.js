'use strict';

$(document).ready(function() {
  const llmModelField = document.getElementById('batch_connect_session_context_llm_model');
  const modelPathField = document.getElementById('batch_connect_session_context_model_path');
  let customOption = null;

  function updateDisplayInfo() {
    const isCustom = $('input[name="batch_connect_session_context[model_source]"]:checked').val() === 'custom';
    
    if (customOption) customOption.remove();
    customOption = null;
    
    if (isCustom) {
      const customPath = modelPathField.value;
      customOption = new Option(customPath, customPath, true, true);
      llmModelField.appendChild(customOption);
    }
  }

  function toggleFields() {
    const isPredefined = $('input[name="batch_connect_session_context[model_source]"]:checked').val() === 'predefined';
    
    $('#batch_connect_session_context_llm_model').closest('.mb-3').toggle(isPredefined);
    $('#batch_connect_session_context_model_path').closest('.mb-3').toggle(!isPredefined);
    $('#batch_connect_session_context_resource_preset').closest('.mb-3').toggle(!isPredefined);
    $('#batch_connect_session_context_custom_time').closest('.mb-3').toggle(!isPredefined);
    $('#batch_connect_session_context_custom_minutes').closest('.mb-3').toggle(!isPredefined);
    
    updateDisplayInfo();
  }
  
  toggleFields();
  $(document).on('change', 'input[name="batch_connect_session_context[model_source]"]', toggleFields);
  modelPathField.addEventListener('input', updateDisplayInfo);
});
