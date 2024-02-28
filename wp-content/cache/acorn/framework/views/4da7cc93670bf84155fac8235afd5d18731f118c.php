<?php if(! post_password_required()): ?>
  <section id="comments" class="comments">
    <?php if($comments): ?>
      <h2>
        <?php echo $title; ?>

      </h2>

      <ol class="comment-list">
        <?php ($comments); ?>
      </ol>

      <?php if($paginated): ?>
        <nav aria-label="Comment">
          <ul class="pager">
            <?php if($previous): ?>
              <li class="previous">
                <?php echo $previous; ?>

              </li>
            <?php endif; ?>

            <?php if($next): ?>
              <li class="next">
                <?php echo $next; ?>

              </li>
            <?php endif; ?>
          </ul>
        </nav>
      <?php endif; ?>
    <?php endif; ?>

    <?php if($closed): ?>
      <?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.alert','data' => ['type' => 'warning']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('alert'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes(['type' => 'warning']); ?>
        <?php echo __('Comments are closed.', 'sage'); ?>

       <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
<?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
<?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
<?php endif; ?>
    <?php endif; ?>

    <?php (comment_form()); ?>
  </section>
<?php endif; ?>
<?php /**PATH /var/www/html/wp-content/themes/starter-theme/resources/views/partials/comments.blade.php ENDPATH**/ ?>