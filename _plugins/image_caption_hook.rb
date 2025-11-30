Jekyll::Hooks.register [:posts, :pages, :notes], :pre_render do |doc|
  # Custom syntax: ![alt]('path' <caption>)
  # Regex explanation:
  # !\[(.*?)\]      -> Match ![alt text]
  # \('(.*?)'\s*    -> Match ('path') with optional space
  # <(.*?)>\)       -> Match <caption text>)
  
  doc.content = doc.content.gsub(/!\[(.*?)\]\('(.*?)'\s*<(.*?)>\)/) do
    alt_text = Regexp.last_match(1)
    image_path = Regexp.last_match(2)
    caption = Regexp.last_match(3)
    
    "<figure><img src=\"#{image_path}\" alt=\"#{alt_text}\"><figcaption>#{caption}</figcaption></figure>"
  end
end
