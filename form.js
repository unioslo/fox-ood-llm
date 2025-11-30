'use strict';

function setupModelSourceToggle() {
  const radios = document.querySelectorAll('input[name="batch_connect_session_context[model_source]"]');
  const llmModelField = document.getElementById('batch_connect_session_context_llm_model');
  const modelPathField = document.getElementById('batch_connect_session_context_model_path');
  const displayInfoField = document.getElementById('batch_connect_session_context_display_info');
  const alacarteField = document.getElementById('batch_connect_session_context_global_fox_alacarte');
  const llmModelGroup = llmModelField.closest('.form-group') || llmModelField.parentElement;
  const modelPathGroup = modelPathField.closest('.form-group') || modelPathField.parentElement;
  const alacarteGroup = alacarteField ? (alacarteField.closest('.form-group') || alacarteField.parentElement) : null;
  
  function updateDisplayInfo() {
    const checked = document.querySelector('input[name="batch_connect_session_context[model_source]"]:checked');
    if (checked) {
      const isCustom = checked.value === 'custom';
      if (isCustom) {
        displayInfoField.value = modelPathField.value;
      } else {
        const selectedOption = llmModelField.options[llmModelField.selectedIndex];
        displayInfoField.value = selectedOption ? selectedOption.text : llmModelField.value;
      }
    }
  }
  
  function toggleFields() {
    const checked = document.querySelector('input[name="batch_connect_session_context[model_source]"]:checked');
    if (checked && llmModelGroup && modelPathGroup) {
      const isCustom = checked.value === 'custom';
      llmModelGroup.style.display = isCustom ? 'none' : '';
      modelPathGroup.style.display = isCustom ? '' : 'none';
      if (alacarteGroup) {
        alacarteGroup.style.display = isCustom ? '' : 'none';
      }
      updateDisplayInfo();
    }
  }
  
  radios.forEach(radio => radio.addEventListener('change', toggleFields));
  llmModelField.addEventListener('change', updateDisplayInfo);
  modelPathField.addEventListener('input', updateDisplayInfo);
  toggleFields();
}

document.addEventListener('DOMContentLoaded', setupModelSourceToggle);
